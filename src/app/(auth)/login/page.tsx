"use client";
import LoginBtn from "@/components/buttons/LoginBtn";
import Breadcrumb from "@/components/smallComponent/Breadcrumb";
import { useAuth } from "@/app/context/AuthContext";
import { login as loginUser } from "@/services/auth.service";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface LoginFormType {
  email: string;
  password: string;
}

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Login", active: true },
];
const LoginPage = () => {
  // const route = useRouter();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      console.log("login response data: ", data);
      if (data.access_token) {
        toast.success(data.message);
        await login(data.access_token);
        localStorage.setItem("authToken", data.access_token);
        // route.push("/");
      } else {
        toast.error("No access token found");
        throw new Error("No access token found");
      }

      // window.location.reload();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        setError(
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Registration failed. Please try again."
        );

        toast.error(
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Registration failed. Please try again."
        );
      }
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="mt-5">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold capitalize py-3">
          Customer Login
        </h1>
      </div>
      {isLoading && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          Loading....
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex dark:text-black flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-10 py-6 md:py-8 lg:py-10">
        {/* Login Form */}
        <div className="bg-[#F5F7FF]  p-6 sm:p-8 md:p-10 w-full rounded-lg shadow-sm">
          <div className="mb-4">
            <h1 className="text-lg md:text-xl font-bold capitalize">
              Registered Customers
            </h1>
            <p className="text-sm md:text-base font-light text-gray-600 mt-2">
              If you have an account, sign in with your email address.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                placeholder="Your password"
                className="mt-1 py-2 sm:py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <LoginBtn
                type="submit"
                title="Sign in"
                className="w-full sm:w-auto"
              />
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
            <div>
              <p>already have a customer account:</p>
              <div>
                <table style={{ width: "100%" }} className=" border-2">
                  <tr className="border capitalize">
                    <td className=" border p-2">email: </td>
                    <td className=" border p-2">password: </td>
                  </tr>
                  <tr className=" border">
                    <td className=" border p-2">jack@jack.com</td>
                    <td className=" border p-2">jack</td>
                  </tr>
                </table>
              </div>
            </div>
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
