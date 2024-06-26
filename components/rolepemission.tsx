"use client"
import React, { useState,useEffect } from 'react';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
type UserList = {
    params: {
        list?: Array<object>,
        SetRole: Function,
        id: string;
    }
};
export default function RolePermission({ params }: UserList) {
    const router = useRouter();
    const [checkedUsers, setCheckedUsers] = useState<string[]>([]);

    const handleCheckboxChange = (userId: string) => {
        const isChecked = checkedUsers.includes(userId);
        if (isChecked) {
            setCheckedUsers(checkedUsers.filter(id => id !== userId));
        } else {
            setCheckedUsers([...checkedUsers, userId]);
        }
    };

    useEffect(() => {
        // Perform the check and state update after the component has rendered
        params.list?.forEach((User: any) => {
            if (User.collectionIDs.includes(params.id)) {
                console.log(User._id);
                setCheckedUsers(prevCheckedUsers => [...prevCheckedUsers, User._id]);
            }
        });
    }, [params.list, params.id]);

    const handleSubmit = async () => {
        // Perform actions with checkedUsers array
        console.log('Checked Users:', checkedUsers);
        const usersList = checkedUsers.map((userID)=>{
            return {
                CollectionID: params.id,
                UserID: userID
            }
        })
        try {
            const NewUserValue = await params.SetRole({
                roleslist: usersList,
                id:params.id
            });
            if(NewUserValue.success){
                toast.success(`${NewUserValue?.message}`);
                router.push('/dashboard/roles');
            }else{
                toast.error(`${NewUserValue?.error}`);
            }
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr >
                        <th scope="col" className="px-6 py-3">Full name</th>
                        <th scope="col" className="px-6 py-3">Permission</th>
                    </tr>
                </thead>
                <tbody>
                    {params.list?.map((User: any, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900'} border-b dark:border-gray-700`}>
                            <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">{User.username}</td>
                            <td className="px-6 py-4">
                                <input

                                    type="checkbox"
                                    checked={checkedUsers.includes(User._id)}
                                    onChange={() => handleCheckboxChange(User._id)}
                                />
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <div className='w-full text-center py-2'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

