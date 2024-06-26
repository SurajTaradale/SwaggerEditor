import Link from "next/link";
import { GetCollections } from "../../../../controller/fileUpload";

export default async function FielsList() {
    const response = await GetCollections({
        fileid: "", // Provide the appropriate file ID here
        filelist: true
    });

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className='w-full text-right py-2 mb-1'>
            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href={'/dashboard/uploadfile/add'}>Add +</Link>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Collection name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            File name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Valid
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {response.files?.map((file, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900'} border-b dark:border-gray-700`}>
                            <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">{file.collectionname}</td>
                            <td className="px-6 py-4 whitespace-nowrap dark:text-white">{file.filename}</td>
                            <td className="px-6 py-4 whitespace-nowrap dark:text-white">{file.valid}</td>
                            <td className="px-6 py-4">
                                <Link href={`/dashboard/uploadfile/${file._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
