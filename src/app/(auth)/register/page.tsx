"use client";
import LoginBtn from "@/app/components/buttons/LoginBtn";
import Breadcrumb from "@/app/components/smallComponent/Breadcrumb";
import { useRouter } from "next/navigation";
import React from "react";
const breadcrumb = [{ label: "Home" }, { label: "Register", active: true }];
const RegisterPage = () => {
  const route = useRouter();

  return (
    <div className="px-[5%] md:px-[10%] py-2">
      <div className="mt-5">
        <Breadcrumb items={breadcrumb} />

        <h1 className="text-2xl font-semibold capitalize py-3">
          Create an Account
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between lg:px-10 xl:px-20 py-10 gap-10">
        <form className="bg-[#F5F7FF] p-5 md:p-10 w-full">
          <div>
            <h1 className="text-lg font-bold capitalize pb-5">
              Personal Information
            </h1>
          </div>
          <div className="pt-5 flex items-start w-full justify-center gap-4 flex-col">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Your first name"
                  className="mt-1 py-3 px-4 border-2 border-gray-400 rounded-md focus:outline-none w-full"
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Your last name"
                  className="mt-1 py-3 px-4 border-2 border-gray-400 rounded-md focus:outline-none w-full"
                />
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Your email"
                className="mt-1 py-3 px-4 border-2 border-gray-400 rounded-md focus:outline-none w-full"
              />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  className="mt-1 py-3 px-4 border-2 border-gray-400 rounded-md focus:outline-none w-full"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  className="mt-1 py-3 px-4 border-2 border-gray-400 rounded-md focus:outline-none w-full"
                />
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="phone">Phone Number (Optional)</label>
              <input
                id="phone"
                type="tel"
                placeholder="Your phone number"
                className="mt-1 py-3 px-4 border-2 border-gray-400 rounded-md focus:outline-none w-full"
              />
            </div>

            <div className="flex items-center justify-start gap-5 pt-3">
              <LoginBtn title="Create Account" />
            </div>
          </div>
        </form>

        <div className="w-full bg-[#F5F7FF] p-5 md:p-10 h-full flex items-start justify-center gap-10 lg:gap-20 flex-col">
          <h1 className="text-2xl font-semibold mb-5 capitalize">
            Already have an account?
          </h1>
          <div>
            <p className="text-sm font-light">
              Sign in to access your account and enjoy these benefits:
            </p>
            <ul className="list-disc pl-10 py-2">
              <li>Faster checkout</li>
              <li>Order history</li>
              <li>Saved addresses</li>
              <li>Wishlist items</li>
            </ul>
          </div>
          <LoginBtn onClick={() => route.push("/login")} title="Sign In" />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
