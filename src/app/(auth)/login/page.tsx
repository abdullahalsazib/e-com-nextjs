"use client";
import LoginBtn from "@/app/components/buttons/LoginBtn";
import Breadcrumb from "@/app/components/smallComponent/Breadcrumb";
import Link from "next/link";
import React from "react";

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Login", active: true },
];
const LoginPage = () => {
  // const route = useRouter();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="mt-5">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold capitalize py-3">
          Customer Login
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-10 py-6 md:py-8 lg:py-10">
        {/* Login Form */}
        <div className="bg-[#F5F7FF] p-6 sm:p-8 md:p-10 w-full rounded-lg shadow-sm">
          <div className="mb-4">
            <h1 className="text-lg md:text-xl font-bold capitalize">
              Registered Customers
            </h1>
            <p className="text-sm md:text-base font-light text-gray-600 mt-2">
              If you have an account, sign in with your email address.
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm md:text-base font-medium"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Your email"
                className="mt-1 py-2 sm:py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm md:text-base font-medium"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Your password"
                className="mt-1 py-2 sm:py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <LoginBtn title="Sign in" className="w-full sm:w-auto" />
              <Link
                href="/forgot"
                className="text-sm md:text-base font-semibold text-indigo-500 hover:text-indigo-600 duration-200 capitalize text-center sm:text-left"
              >
                Forgot your password?
              </Link>
            </div>
          </form>
        </div>

        {/* New Customer Section */}
        <div className="bg-[#F5F7FF] p-6 sm:p-8 md:p-10 w-full rounded-lg shadow-sm flex flex-col items-start gap-6 md:gap-8">
          <h1 className="text-xl md:text-2xl font-semibold capitalize">
            New Customer?
          </h1>

          <div className="space-y-2">
            <p className="text-sm md:text-base font-light">
              Creating an account has many benefits:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
              <li>Check out faster</li>
              <li>Keep more than one address</li>
              <li>Track orders and more</li>
            </ul>
          </div>

          <LoginBtn
            href="/register"
            title="Create an account"
            className="w-full md:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
