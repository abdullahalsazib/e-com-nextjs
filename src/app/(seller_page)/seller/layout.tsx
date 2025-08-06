"use client";

import Loading from "@/components/Loading";
import { Suspense, useState } from "react";
import Sidebar from "./seller_component/Sidebar";
import PrivateRoute from "@/components/PrivateRoute";
import Seller_navber from "./seller_component/Seller_navber";

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
          <PrivateRoute allowedRoles={["admin"]}>
            <div className="w-full h-screen bg-gradient-to-tr dark:from-gray-950 from-purple-50 dark:to-slate-950 to-zinc-50 flex overflow-hidden">
              {/* Sidebar with toggle animation */}
              <div
                className={`h-full dark:bg-slate-900 bg-white transition-all duration-300 ease-in-out ${
                  sidebarOpen ? "w-64" : "w-20"
                }`}
              >
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
              </div>

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
      </main>
    </>
  );
}

// https://preview.themeforest.net/item/shoppoint-ecommerce-admin-dashboard-reactjs-template/full_screen_preview/47313740
