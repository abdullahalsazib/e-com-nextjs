"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoDiamondOutline } from "react-icons/io5";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      path: "/vendor/dashboard",
    },
    {
      name: "Products",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      path: "/vendor/dashboard/products",
    },
    {
      name: "Orders",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      path: "/vendor/dashboard/orders",
    },
    {
      name: "Customers",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      path: "/vendor/dashboard/customers",
    },
    {
      name: "Analytics",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      path: "/vendor/dashboard/analytics",
    },
    {
      name: "Settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
      path: "/vendor/dashboard/settings",
    },
  ];

  return (
    <div className="h-full flex flex-col border-r ">
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b ">
        {isOpen ? (
          <h1 className="text-xl font-bold text-green-600">SellerHub</h1>
        ) : (
          <h1 className="text-xl font-bold text-green-600">SH</h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 w-full">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`flex items-center  p-3 rounded-lg ${
                  pathname === item.path
                    ? "dark:bg-slate-800 bg-green-50 text-green-600"
                    : "text-gray-600 dark:hover:bg-gray-800 hover:bg-gray-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.icon}
                  />
                </svg>
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
        {/* <Button size="lg">
          <CgProfile /> {user?.name}
        </Button> */}
        {/* <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
            {user?.ID}
          </div>
          {isOpen && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
