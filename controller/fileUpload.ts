"use server";
import { connect } from "../db/dbConfig";
import Collection from "../models/fileupload";
import { getDataFromToken } from "../helper/getDataFromToken";
import { revalidatePath } from "next/cache";
connect()
type FileUpload = {
    filename: string,
    collectionname: string,
    content: string,
    valid: string
}
type GetCollectionList = {
    filelist: boolean,
    fileid: string,
}

type IpdateFileUpload = {
    filename: string,
    collectionname: string,
    content: string,
    _id : string,
    valid: string
}
export async function AddCollection(FileUpload: FileUpload) {
    try {
        // const reqBody = await request.json()
        const userId = await getDataFromToken();
        if (!userId) {
            return { error: "Invalid User Token", success: false, };
        }
        const { filename, collectionname, content, valid } = FileUpload;
        if(!filename || !collectionname || !content || !valid){
            return { error: "Please provide all the details", success: false, };
        }
        //check if user already exists
        const userExists = await Collection.exists({ collectionname });

        if (userExists) {
            return { error: "User already exists", success: false, };
        }

        const savedCollection = await Collection.create({
            filename,
            collectionname,
            content,
            valid
        });

        const tempUser = savedCollection.toObject();
        const userID = tempUser._id.toString(); // Convert _id to a plain string
        // Send verification email
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })
        revalidatePath('/dashboard/uploadfile')
        return {
            message: "Collection created successfully",
            success: true,
            ID: userID, // Pass the string representation of _id
        };
            
        

    } catch (error: any) {
        console.log(error)
        return { error: `${error}`, success: false, };

    }
}
export async function GetCollections(GetCollectionList:GetCollectionList) {
    try {
        const userId = await getDataFromToken();
        if (!userId) {
            return { error: "Invalid User Token", success: false };
        }
        
        const { fileid, filelist } = GetCollectionList;

        // If fileid is provided, check if it exists
        if (fileid) {
            const CheckFile = await Collection.exists({ _id: fileid });
            if (!CheckFile) {
                return { error: "File does not exist", success: false };
            }
            const file = await Collection.findOne({ _id: fileid });
            file.content  = atob(file.content);
            return {
                message: "File uploaded successfully",
                success: true,
                file: file
            };
        } else { // If fileid is not provided, get list of all files
            const files = await Collection.find({}, { collectionname: 1, filename: 1, _id: 1, valid : 1 });
            // Projection to include only collectionname and filename
            return {
                message: "File List",
                success: true,
                files: files.map(file => ({ collectionname: file.collectionname, filename: file.filename, _id : file._id.toString(), valid: file.valid  }))
            };
        }
    } catch (error) {
        console.error(error);
        return { error: "An error occurred", success: false };
    }
}
export async function UpdateCollections(IpdateFileUpload:IpdateFileUpload) {
    try {
        console.log("Updated function")
        const userId = await getDataFromToken();
        if (!userId) {
            return { error: "Invalid User Token", success: false };
        }
        
        const { _id, filename, collectionname, content, valid } = IpdateFileUpload;
        console.log(IpdateFileUpload)
        if(!filename || !collectionname || !_id || !valid){
            return { error: "Please provide all the details", success: false, };
        }
        const doc = await Collection.findById({_id});
        doc.filename = filename;
        doc.collectionname = collectionname;
        doc.valid = valid;
        if(content){
            doc.content = content;
        }
        // If fileid is provided, check if it exists
        const updatedDoc = await doc.save();
        revalidatePath('/dashboard/uploadfile')
        return {
            message: "File Updated successfully",
            success: true,
        };

    } catch (error) {
        console.error(error);
        return { error: "An error occurred", success: false };
    }
}
