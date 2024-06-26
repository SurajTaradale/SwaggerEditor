"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
type UserList = {
    params: {
        list: Array<object>,
        SetFiles: Function
    }
};
export default function RolesList({ params }: UserList) {
    const router = useRouter();
    const approve = async (id:any) =>{
        console.log(id)
        try {
            const approve =  await params.SetFiles({
                _id : id as string
            })
            if(approve.success){
                toast.success(`${approve?.message}`);
                router.push('/dashboard/verifyuser');
            }else{
                toast.error(`${approve?.message}`);
            }
        } catch (error) {
            toast.error(`${error}`);
        }
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Collections
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {params.list.map((file:any, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900'} border-b dark:border-gray-700`}>
                            <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                <Link href={`/dashboard/roles/${file._id}`}>
                                    {file.collectionname}
                                </Link>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}