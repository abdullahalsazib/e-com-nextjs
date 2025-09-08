"use client";

import Loading from "@/components/Loading";
import PrivateRoute from "@/components/PrivateRoute";
import { Suspense, useState } from "react";
import {motion} from "framer-motion"
import Super_admin_navber from "./components/Super_a_navber";
import { LucideAccessibility } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrDashboard } from "react-icons/gr";
import { CiShop } from "react-icons/ci";
import { BiUser } from "react-icons/bi";
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

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
 const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* <h1>Seller Layout</h1> */}
      <main>
        <Suspense fallback={<Loading message="Preparing dashboard" />}>
          <PrivateRoute allowedRoles={["superadmin"]}>
            <div className="w-full h-screen bg-gradient-to-tr dark:from-gray-950 from-purple-50 dark:to-slate-950 to-zinc-50 flex overflow-hidden">
              {/* Sidebar with toggle animation */}
                <motion.div 
              initial={{
                opacity: 1,
                y: 0
              }}
              animate={{
                x: sidebarOpen ? 0 : -550 
              }}
              transition={{duration: 0.5}}
              
              className={` fixed z-50 w-72 lg:w-65 h-full bg-white dark:bg-slate-900 border-r-2 ${sidebarOpen ? "translate-x-0" : "translate-x-10"}`}>
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -500,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{ duration: 0.8 }
                  } onClick={() => setSidebarOpen(!sidebarOpen)} className=" absolute border-r-2 border-t-2 border-b-2 top-1/2 -right-10.5 rounded-r-3xl cursor-pointer text-lg p-2 bg-white dark:bg-slate-900">
                <LucideAccessibility className=" hover:scale-110 hover:translate-x-4 active:translate-x-5 duration-200" />
              </motion.div>
              {/* custome sidebar  */}
              <div className="">
                <div className="flex items-center justify-center py-7 ">
                  <h1 className="text-xl font-bold text-green-600">Super Admin </h1>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 w-full">
                  <ul className="space-y-1 px-2">
                    {navItemsSuperAdmin.map((item) => (
                      <li key={item.name} className="">
                        <Link
                          href={item.path}
                          className={` rounded-md duration-300 dark:text-white/50 hover:dark:text-white/70 flex items-center justify-start py-2.5 px-5
                             ${pathname === item.path ?
                              "text-black dark:text-white/100 uppercase bg-blue-500/20 border-black"
                              :
                              "text-black/50 hover:text-black/70 "
                            }`}
                        >
                          
                          <span className="ml-3 font-medium">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>

              {/* Main content area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <>
                  <Super_admin_navber
                    isOpen={sidebarOpen}
                    setOpen={toggleSidebar}
                  />
                </>

                {/* Main content */}
                <div className=" overflow-y-scroll">{children}</div>
              </div>
            </div>
          </PrivateRoute>
        </Suspense>
      </main>
    </>
  );
}
