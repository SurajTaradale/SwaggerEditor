import Link from "next/link";
import { AprroveLogin, VerifyUserList } from "../../../../../controller/users";
import VerifyUserPage from "../../../../../components/verifyUser";
import RolePermission from "../../../../../components/rolepemission";
import { GetRolesList, addRole } from "../../../../../controller/roles";
type PostPageProps = {
    params: {
        id: string;
    };
};
export default async function PermissionList({ params }: PostPageProps) {
    const response = await GetRolesList();
    // console.log("test", response)
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <RolePermission params={{
                list: response.usersWithRoles,
                SetRole : addRole,
                id: params.id
            }}/>
        </div>
    );
}
