// addUsers.ts
import mongoose from 'mongoose';
import User from './models/userModel';
import { connect } from "./db/dbConfig";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// Database URL
connect()

// Default users to add
const defaultUsers = [
    { username: 'admin', email: 'admin@admin.com', password: 'admin', isAdmin: true,isVerfied:true }
];

const addUser = async () => {
    try {

        for (const userData of defaultUsers) {
            const salt = await bcryptjs.genSalt(12);
            const hashedPassword = await bcryptjs.hash(userData.password, salt);
    
            const savedUser = await User.create({
                username: userData.username,
                email: userData.email,
                password: hashedPassword,
                isAdmin: userData.isAdmin,
                isVerfied: userData.isVerfied

            });
    
            const tempUser = savedUser.toObject();
            const userID = tempUser._id.toString(); // Convert _id to a plain string
            console.log(userID)
        }

        console.log('Default users added successfully.');
    } catch (error) {
        console.error('Error adding users:', error);
    } finally {
        mongoose.connection.close();
    }
};

addUser();
