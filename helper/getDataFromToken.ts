import { cookies } from 'next/headers'
import jwt from "jsonwebtoken";
import { Console } from 'console';

export const getDataFromToken = () => {
    try {
        const cookieValue: string = cookies().get('token')?.value || '';
        const decodedToken: any = jwt.verify(cookieValue, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error: any) {
        console.error(error.message);
    }

}
