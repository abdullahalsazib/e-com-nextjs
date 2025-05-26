"use client";
import LoginBtn from "@/app/components/buttons/LoginBtn";
import Breadcrumb from "@/app/components/smallComponent/Breadcrumb";
import { useRouter } from "next/navigation";
import React from "react";

const breadcrumb = [{ label: "Home" }, { label: "Register", active: true }];

const RegisterPage = () => {
  // const route = useRouter();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="mt-5">
        <Breadcrumb items={breadcrumb} />

        <h1 className="text-2xl sm:text-3xl font-semibold capitalize py-3">
          Create an Account
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-8">
        {/* Registration Form */}
        <div className="bg-[#F5F7FF] p-6 sm:p-8 md:p-10 w-full rounded-lg shadow-sm">
          <h1 className="text-lg md:text-xl font-bold capitalize pb-5">
            Personal Information
          </h1>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Your first name"
                  className="mt-1 py-2 sm:py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Your last name"
                  className="mt-1 py-2 sm:py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Your email"
                className="mt-1 py-2 sm:py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  className="mt-1 py-2 sm:py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  className="mt-1 py-2 sm:py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Your phone number"
                className="mt-1 py-2 sm:py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>

            <div className="pt-4">
              <LoginBtn title="Create Account" className="w-full md:w-auto" />
            </div>
          </form>
        </div>

        {/* Login Panel */}
        <div className="bg-[#F5F7FF] p-6 sm:p-8 md:p-10 w-full rounded-lg shadow-sm flex flex-col items-start gap-6 lg:gap-8">
          <h1 className="text-xl sm:text-2xl font-semibold capitalize">
            Already have an account?
          </h1>

          <div className="space-y-2">
            <p className="text-sm sm:text-base font-light">
              Sign in to access your account and enjoy these benefits:
            </p>
            <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>Faster checkout</li>
              <li>Order history</li>
              <li>Saved addresses</li>
              <li>Wishlist items</li>
            </ul>
          </div>

          <LoginBtn
            href="/login"
            title="Sign In"
            className="w-full md:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
