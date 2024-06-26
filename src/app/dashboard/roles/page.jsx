import Link from "next/link";
import { AprroveLogin, VerifyUserList} from "../../../../controller/users";
import RolesList from "../../../../components/roles";
import { GetCollections } from "../../../../controller/fileUpload";

export default async function RolesPage() {
    const response = await GetCollections({
        filelist: true, 
        fileid: "",
    });
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <RolesList  params={{
                list: response.files,
                SetFiles : AprroveLogin,
            }}/>
        </div>
    );
}
