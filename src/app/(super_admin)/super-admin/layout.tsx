"use client";

import Loading from "@/components/Loading";
import PrivateRoute from "@/components/PrivateRoute";
import { Suspense, useState } from "react";
import Super_admin_Sidebar from "./superadmin_components/Super_a_sidebar";
import Super_admin_navber from "./superadmin_components/Super_a_navber";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
              <div
                className={`h-full dark:bg-slate-900 bg-white transition-all duration-300 ease-in-out `}
              >
                <Super_admin_Sidebar
                  isOpen={sidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </div>

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
