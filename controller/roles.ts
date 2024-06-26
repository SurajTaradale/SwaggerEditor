"use server"
import User from "../models/userModel";
import Roles from "../models/roleModel";
import { getDataFromToken } from "../helper/getDataFromToken";
import { connect } from "../db/dbConfig";
import { revalidatePath } from "next/cache";
import Collection from "../models/fileupload";

connect();
type RolesPermissionList = {
    roleslist: Array<object>,
    id: String
}
type GetCollections = {
    id: string,
}
export async function GetRolesList() {
    try {
        const userId = await getDataFromToken();
        if (!userId) {
            return { error: "Invalid User Token", success: false };
        }

        const usersWithRoles = await User.aggregate([
            {
                $lookup: {
                    from: "roles", // Collection name to lookup
                    localField: "_id", // Field from the user collection
                    foreignField: "UserID", // Field from the roles collection
                    as: "rolesData" // Alias for the joined data
                }
            },
            {
                $unwind: {
                    path: "$rolesData",
                    preserveNullAndEmptyArrays: true // Preserve users without roles
                }
            },
            {
                $group: {
                    _id: "$_id",
                    username: { $first: "$username" },
                    email: { $first: "$email" },
                    isAdmin: { $first: "$isAdmin" },
                    collectionIDs: { $addToSet: "$rolesData.CollectionID" }
                }
            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    email: 1,
                    isAdmin: 1,
                    collectionIDs: { $ifNull: ["$collectionIDs", []] } // Replace null with empty array
                }
            }
        ]).exec();
        const usersWithRolesPlain = usersWithRoles.map(user => ({
            ...user,
            _id: user._id.toString() // Convert ObjectId to string
        }));
        return { usersWithRoles: usersWithRolesPlain, success: true, message :"success" };
    } catch (error) {
        console.error("Error retrieving user list with roles:", error);
        return { error: "An error occurred while retrieving user list with roles. Please try again later.", success: false };
    }
}


export async function addRole(RolesPermissionList: RolesPermissionList) {
    try {
        // Create a new role document
        const userId = await getDataFromToken();
        if (!userId) {
            return { error: "Invalid User Token", success: false };
        }
        const { roleslist } = RolesPermissionList
        const DeleteRoles = await Roles.deleteMany({ CollectionID: RolesPermissionList.id });
        if (!DeleteRoles) {
            return { error: "somthing wrong", success: false };
        }
        const savedRoles = await Roles.insertMany(roleslist);
        // Save the new role document to the database
        revalidatePath(`/dashboard/roles/${RolesPermissionList.id}`)
        revalidatePath(`/home`)

        return { success: true, message: "Role added successfully" };
    } catch (error) {
        console.error("Error adding role:", error);
        return { error: "Failed to retrieve user list with roles", success: false };
    }
}

export async function GetCollectionsByID(GetCollections: GetCollections) {
    try {
        const userId = await getDataFromToken();
        if (!userId) {
            return { error: "Invalid User Token", success: false };
        }
        // Find roles associated with the given userID
        const userRoles = await Roles.find({ UserID: GetCollections.id || userId});
        console.log(userRoles)

        // Extract CollectionIDs from userRoles
        const collectionIDs = userRoles.map(role => role.CollectionID);

        // Find collections using the extracted CollectionIDs
        const collections = await Collection.find(
            { _id: { $in: collectionIDs } },
            { _id: 1, filename: 1, collectionname: 1 } // Projection to include only id, filename, and collectionname fields
        );

        // Return the collections
        return {collections: collections, success: true, message: "successfully"};
    } catch (error) {
        console.error("Error fetching collections:", error);
        throw error;
    }
}