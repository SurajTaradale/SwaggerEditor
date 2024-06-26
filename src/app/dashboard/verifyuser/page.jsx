import Link from "next/link";
import { AprroveLogin, VerifyUserList} from "../../../../controller/users";
import VerifyUserPage from "../../../../components/verifyUser";

export default async function FielsList() {
    const response = await VerifyUserList({
        usertype: false,
    });
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <VerifyUserPage params={{
                list: response.Users,
                SetFiles : AprroveLogin,
            }}/>
        </div>
    );
}
