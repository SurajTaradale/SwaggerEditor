"use client";
import { useFormState, useFormStatus } from "react-dom";
import { AddUser } from "../../../controller/users";
import Header from "../../../components/publicHeader"
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import Image from "next/image";
import Link from 'next/link';
export default function AddPostForm() {
    const { pending } = useFormStatus();
    const router = useRouter()
    const addPost = async (formData: FormData) => {
        
        console.log(formData)
        try {
            const NewUserValue = await AddUser({
                username: formData.get("fullname") as string,
                email: formData.get("email") as string,
                password: formData.get("password") as string,
            });
            if(NewUserValue.success){
                toast.success(`${NewUserValue?.message}`);
                router.push('/login');
            }else{
                toast.error(`${NewUserValue?.error}`);
            }
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    return (
        <div className=" h-screen bg-white overflow-hidden">
            <Header />
            <form action={addPost} className="flex flex-col md:flex-row mx-auto border-t border-gray-300">
                    <div className="bg-white p-8 rounded basis-1/2 mx-auto  w-full max-w-[450px]">
                        <p className="text-2xl font-500 text-blue-500 mb-4">Create an account</p>
                        <p className="text-gray-600 mb-4">Enter your information below to create an account</p>
                        
                        <label className="block font-bold mb-2">Full Name</label>
                        <input type="text" name="fullname" className="w-full border border-gray-300 p-2 rounded mb-4" />

                        <label className="block font-bold mb-2">Email</label>
                        <input type="email" name="email" className="w-full border border-gray-300 p-2 rounded mb-4" />

                        <label className="block font-bold mb-2">Password</label>
                        <input type="password" name="password" className="w-full border border-gray-300 p-2 rounded mb-4" />


                        <button className="bg-green-500 text-white pl-8 pr-8 pt-2 pb-2  rounded" type="submit">Create account</button>

                        <p className="mt-4 text-gray-600">Already have an account? <Link href="/login" className="text-blue-500">Login
                                here</Link></p>
                    </div>
                <div className="basis-1/2 text-white text-center p-20 flex flex-col items-center" style={{ backgroundColor: '#16395b' }}>
                    <Image
                        src="/assets/logo.png"
                        alt="Vercel Logo"
                        className="dark:invert h-auto"
                        width={250}
                        height={2024} // Setting height to undefined will automatically determine the height based on aspect ratio
                        priority
                        />
                    <div className="flex items-center mb-4">
                        <h2 className="text-2xl font-bold">Welcome to Developer Portal</h2>
                    </div>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua.</p>
                </div>
            </form>
        </div>
    );
}