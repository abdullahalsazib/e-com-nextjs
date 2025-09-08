"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiUser } from "react-icons/bi";
import { CiShop } from "react-icons/ci";
import { GrDashboard } from "react-icons/gr";
import { IoDiamondOutline } from "react-icons/io5";


interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}
const navItemsSuperAdmin = [
  {
    name: "Dashboard",
    icon: <GrDashboard />,
    path: "/super-admin",
  },
  {
    name: "Vendors",
    icon: <CiShop />,
    path: "/super-admin/dashboard/vendors",
  },
  {
    name: "Users ",
    icon: <BiUser />,
    path: "/super-admin/dashboard/users",
  },
];


const Super_admin_Sidebar = ({ isOpen }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col border-r ">
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b ">
        {isOpen ? (
          <h1 className="text-xl font-bold text-green-600">Super admin</h1>
        ) : (
          <h1 className="text-xl font-bold text-green-600">SA</h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 w-full">
        <ul className="space-y-1 px-2">
          {navItemsSuperAdmin.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`flex items-center  p-3 rounded-lg ${
                  pathname === item.path
                    ? "dark:bg-slate-800 bg-green-50 text-gray-300"
                    : "text-gray-600 dark:hover:bg-gray-800 hover:bg-gray-100"
                }`}
              >
                <span>{item.icon}</span>
                {isOpen && (
                  <span className="ml-3 font-medium">{item.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User profile */}
      <div className="p-4 border-t  flex items-center justify-center">
        {isOpen && (
          <div className=" flex flex-col items-start justify-between rounded-lg w-full h-[200px] bg-gradient-to-tl from-blue-200 to-sky-200 p-4">
            <Button
              size="icon"
              variant="secondary"
              className=" size-9 shadow-2xl"
            >
              <IoDiamondOutline />
            </Button>

            <div className=" space-y-1 w-full">
              <h1 className=" text-lg text-gray-600 font-bold">Need help ?</h1>
              <p className=" text-gray-600 pb-1">Please check our doc</p>
              <Button size="default" variant="secondary" className="  w-full">
                Documentation
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Super_admin_Sidebar;
