"use client";

import Loading from "@/components/Loading";
import { Suspense, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import Seller_navber from "./components/Seller_navber";
import { navItemsForSellerDashboard as seller_dashboard } from "@/data/navegationLinks";
import Link from "next/link";
import { LucideAccessibility } from "lucide-react";
import { motion } from "framer-motion"
import { usePathname } from "next/navigation";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* <h1>Seller Layout</h1> */}
      <main>
        <Suspense fallback={<Loading message="Preparing dashboard" />}>
          <PrivateRoute allowedRoles={["admin"]}>
            <div className="w-full h-screen bg-gradient-to-tr dark:from-gray-950 from-purple-50 dark:to-slate-950 to-zinc-50 flex overflow-hidden">
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
                  <h1 className="text-xl font-bold text-green-600">SellerHub</h1>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 w-full">
                  <ul className="space-y-1 px-2">
                    {seller_dashboard.map((item) => (
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
                <Seller_navber isOpen={sidebarOpen} setOpen={toggleSidebar} />
              </>

              {/* Main content */}
              <div className=" overflow-y-scroll">{children}</div>
            </div>
          </div>
        </PrivateRoute>
      </Suspense>
    </main >
    </>
  );
}

// https://preview.themeforest.net/item/shoppoint-ecommerce-admin-dashboard-reactjs-template/full_screen_preview/47313740
