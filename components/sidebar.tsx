import Link from "next/link";

const Sidebar = () => {
  const SideBarList = [
    {
      name : "Collections",
      link: "/dashboard/uploadfile"
    },
    {
      name : "Roles",
      link: "/dashboard/roles"
    },
    {
      name : "SignUp Users",
      link: "/dashboard/verifyuser"
    },
  ];
  return (
      <aside className="w-full md:w-64 lg:w-64 p-6 text-gray-600 border-r border-l border-solid border-gray-300">
          <ul className="flex flex-row overflow-scroll md:flex-col lg:flex-col md:overflow-hidden lg:overflow-hidden">
              {
                SideBarList.map((sidebar, index)=>{
                  return (
                    <li className="list-none" key={index}>
                      <Link href={sidebar.link} className="block py-2 px-4">{sidebar.name}</Link>
                  </li>
                  );
                })
              }
          </ul>
      </aside>
  );
};

export default Sidebar;