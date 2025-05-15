import LoginBtn from "@/app/components/buttons/LoginBtn";
import React from "react";
import { FaAngleRight } from "react-icons/fa6";

const LoginPage = () => {
  return (
    <div className=" px-[10%] py-2">
      <div className=" mt-5">
        <p className=" text-xs font-light capitalize mb-1 text-gray-700 flex items-center justify-start gap-1">
          home <FaAngleRight className="text-blue-500" /> Login
        </p>
        <h1 className=" text-2xl font-semibold capitalize py-3">
          Customaer Login
        </h1>
      </div>
      <div className="flex items-center justify-between px-40 py-10 gap-10">
        <form className="bg-[#F5F7FF] p-15 w-full">
          <div>
            <h1 className=" text-lg font-bold capitalize pb-5">
              Registered Customers
            </h1>
            <p className=" text-sm font-light text-gray-600">
              If you have an account, sign in with your email address.
            </p>
          </div>
          <div className=" pt-5 flex items-start w-full justify-center gap-4 flex-col">
            <div className=" w-full">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Your email"
                className="mt-1 py-3 px-4 border-2 border-gray-400 rounded-md focus:outline-none w-full"
              />
            </div>
            <div className=" w-full">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Your password"
                className="mt-2 py-3 px-4 border-2 border-gray-400 rounded-md focus:outline-none w-full"
              />
            </div>
            <div className="flex items-center justify-start gap-5">
              <LoginBtn title="Sign in" />
              <a
                className=" text-sm font-semibold text-indigo-500 hover:text-indigo-600 duration-200 capitalize"
                href="#"
              >
                forgot your password?
              </a>
            </div>
          </div>
        </form>
        <div className=" w-full bg-[#F5F7FF] p-10 h-full flex items-start justify-center gap-20 flex-col">
          <h1 className=" text-2xl font-semibold mb-5 capitalize">
            new customer?
          </h1>
          <div>
            {" "}
            <p className=" text-sm font-light">
              Creating an account has many benefits:{" "}
            </p>
            <ul className="list-disc pl-10 py-2">
              <li>Check out faster</li>
              <li>Keep more than one address</li>
              <li>Track orders and more.</li>
            </ul>
          </div>
          <LoginBtn title="Create and account" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
