"use client";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

type PostPageProps = {
    params: {
        id: string,
        collectionname: string,
        filename: string,
        SetFile: Function,
        valid: string,
    };
};
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};
export default function ChooseFile({ params }: PostPageProps) {
    const { pending } = useFormStatus();
    const router = useRouter();
    const [Collection, setCollection] = useState({
        content: "",
        filename: params.filename,
        collectionname: params.collectionname,
        valid:params.valid,
    });

    const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const base64String = await fileToBase64(file);
                const base64WithoutPrefix = base64String.split(',')[1];
                setCollection({
                    ...Collection,
                    content: base64WithoutPrefix,
                    filename: file.name
                });
            } catch (error) {
                console.error('Error converting file to base64:', error);
            }
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCollection((prevUser) => ({
          ...prevUser,
          [name]: value
        }));
    };
    const addPost = async (formData: FormData) => {
        
        try {
            const NewUserValue = await params.SetFile({
                filename: Collection.filename as string,
                content: Collection.content as string,
                collectionname: Collection.collectionname as string,
                _id: params.id as String,
                valid: Collection.valid as string || "valid",
            });
            if(NewUserValue.success){
                toast.success(`${NewUserValue?.message}`);
                router.push('/dashboard/uploadfile');
            }else{
                toast.error(`${NewUserValue?.error}`);
            }
        } catch (error) {
            toast.error(`${error}`);
        }
    };
    return (
        <div className="h-screen bg-white">
            <form action={addPost}>
                <div className="flex items-center bg-gray-50">
                    <div className="flex-1  bg-white rounded-lg shadow-xl">
                        <div className="flex flex-col p-6">
                            <div className="flex items-center justify-center">
                                <div className="w-full">
                                    <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                                        Create an collection
                                    </h1>
                                    <div>
                                        <label className="block text-sm">Collection Name</label>
                                        <input value={Collection.collectionname} type="text" name="collectionname" className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="" 
                                        onChange={handleInputChange}
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label className="block text-sm">File Name</label>
                                        <input type="text" name="filename" className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="" value={Collection.filename} readOnly />
                                    </div>
                                    <div>
                                        <label className="block mt-4 text-sm"></label>
                                        <input className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="" name="contents" type="file" onChange={handleFileInputChange} />
                                    </div>
                                    <div>
                                        <label className="block mt-4 text-sm">Valid</label>
                                        <select className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" name="valid" onChange={handleInputChange} value={Collection.valid}>
                                            <option>Valid</option>
                                            <option>Invalid</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue" >
                                        Create Collection
                                    </button>
                                    <hr className="my-8" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}