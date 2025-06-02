"use client";

import Loading from "@/app/components/Loading";
import { Suspense, useState } from "react";
import Sidebar from "./seller_component/Sidebar";
import PrivateRoute from "@/app/components/PrivateRoute";
import { BsPersonFillX } from "react-icons/bs";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const toggleProfle = () => {
    setProfileOpen(!profileOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* <h1>Seller Layout</h1> */}
      <main>
        <Suspense fallback={<Loading message="Preparing dashboard" />}>
          {/* <PrivateRoute allowedRoles={[""]}> */}
          <div className="w-full h-screen bg-white flex overflow-hidden">
            {/* Sidebar with toggle animation */}
            <div
              className={`h-full bg-white transition-all duration-300 ease-in-out ${
                sidebarOpen ? "w-64" : "w-20"
              }`}
            >
              <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Top header/search bar */}
              <div className="bg-green-100 py-4 px-6 flex items-center justify-between border-b border-gray-300">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleSidebar}
                    className="text-gray-600 hover:text-gray-900 focus:outline-none"
                  >
                    {sidebarOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </button>
                  <h1 className="text-xl font-semibold text-gray-800">
                    Seller Dashboard
                  </h1>
                </div>

                <div className="relative w-1/3">
                  <input
                    type="text"
                    placeholder="Search here..."
                    className="w-full outline-none border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>
                  <button onClick={toggleProfle} className=" relative">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
                      {!profileOpen ? (
                        "SD"
                      ) : (
                        <BsPersonFillX className="text-2xl" />
                      )}
                    </div>
                    <div
                      className={` absolute top-10 right-0 w-50 h-auto bg-white border border-gray-300 shadow-lg rounded-lg ${profileOpen ? "translate-y-0 opacity-90 duration-150" : " opacity-0 -translate-y-10 duration-200"} `}
                    >
                      <ul className=" p-2">
                        <li className="py-2 px-3 bg-slate-300 capitalize text-black hover:text-blue-500 duration-200 rounded-md">
                          <p>Logout</p>
                        </li>
                      </ul>
                    </div>
                  </button>
                </div>
              </div>
              {/* Main content */}

              <div className=" overflow-y-scroll">{children}</div>
              {/* <Seller_dashboard /> */}
            </div>
          </div>
          {/* </PrivateRoute> */}
        </Suspense>
      </main>
    </>
  );
}

// https://preview.themeforest.net/item/shoppoint-ecommerce-admin-dashboard-reactjs-template/full_screen_preview/47313740
