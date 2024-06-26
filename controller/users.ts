"use server";
import { connect } from "../db/dbConfig";
import User from "../models/userModel";
import { cookies } from 'next/headers';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "../helper/getDataFromToken";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
connect()
type UserData = {
    username: string,
    email: string,
    password: string,
}
type LoginData = {
    email: string,
    password: string,
}
type VerifyUserList = {
    usertype : boolean
}
type VerifyUser ={
    _id : string
}
export async function AddUser(userData: UserData) {
    try {
        // const reqBody = await request.json()
        const { username, email, password } = userData;
        if(!username || !email || !password){
            return { error: "Please provide all the details", success: false, };
        }
        //check if user already exists
        const userExists = await User.exists({ email });

        if (userExists) {
            return { error: "User already exists", success: false, };
        }

        //hash password
        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const savedUser = await User.create({
            username,
            email,
            password: hashedPassword,
            isVerfied: true, isAdmin: true
        });

        const tempUser = savedUser.toObject();
        const userID = tempUser._id.toString(); // Convert _id to a plain string

        // Send verification email
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return {
            message: "User created successfully",
            success: true,
            ID: userID, // Pass the string representation of _id
        };

    } catch (error: any) {
        console.log(error)
        return { error: `${error}`, success: false, };

    }
}
export async function Login(LoginData: LoginData) {
    try {
        // const reqBody = await request.json()
        const { email, password } = LoginData;
        if(!email || !password){
            return { error: "Please provide all the details", success: false, };
        }
        //check if user already exists
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return { error: "User not exists", success: false, };
        }
        if(user.valid == 'Invalid'){
            return { error: "User don't have access", success: false, };
        }
        if(!user.isVerfied){
            return { error: "User is not verified, Please contact adminstor.", success: false, };
        }
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return { error: "Invalid Password", success: false, };
        }
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        cookies().set("token", token, {
            httpOnly: true, 
        })
        await new Promise((resolve) => setTimeout(resolve, 500));
        // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return {
            message: "Login successfully",
            success: true,
        };

    } catch (error: any) {
        console.log(error)
        return { error: `${error}`, success: false, };

    }
}

export async function VerifyUserList(VerifyUserList:VerifyUserList) {
    try {
        const userId = await getDataFromToken();
        if (!userId) {
            return { error: "Invalid User Token", success: false };
        }
        const { usertype } = VerifyUserList;
        // If fileid is provided, check if it exists
        const Users = await User.find({ isVerfied : usertype});
        // Projection to include only collectionname and filename
        return {
            message: "File List",
            success: true,
            Users: Users.map(User => ({ username: User.username, email: User.email, _id : User._id.toString(), isVerfied: User.isVerfied  }))
        };
        // }
    } catch (error) {
        console.error(error);
        return { error: "An error occurred", success: false };
    }
}

export async function AprroveLogin(VerifyUser:VerifyUser) {
    try {
        const userId = await getDataFromToken();
        if (!userId) {
            return { error: "Invalid User Token", success: false };
        }
        
        const { _id } = VerifyUser;
        // If fileid is provided, check if it exists
        const Users = await User.findById({_id});
        // Projection to include only collectionname and filename
        Users.isVerfied = true;
        const updatedDoc = await Users.save();
        if(!updatedDoc){
            return { message: "Somthing wrong!! try again", success: false };
        }
        revalidatePath('/dashboard/verifyuser')
        return {
            message: "Verified User",
            success: true,
        };
        // }
    } catch (error) {
        console.error(error);
        return { error: "An error occurred", success: false };
    }
}
export async function Logout() {
    try {
        const userId = await getDataFromToken();
        if (!userId) {
            return { error: "Invalid User Token", success: false };
        }
        console.log("Logout", userId)
        // Clear the user's token (assuming you're using cookies);
        cookies().delete("token");
        cookies().set("token", "", 
        { httpOnly: true, expires: new Date(0) 
        });

        // You can also perform any other necessary cleanup or actions here

        return {
            message: "Logout successful",
            success: true,
        };
    } catch (error) {
        console.error(error);
        return { error: "An error occurred during logout", success: false };
    }
}