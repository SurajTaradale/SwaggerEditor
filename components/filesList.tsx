import { GetCollections } from "../controller/fileUpload";

export  async function FielsList() {
    const response = await GetCollections({
        fileid: "", // Provide the appropriate file ID here
        filelist: true
    });
    console.log(response)

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>
    );
}
