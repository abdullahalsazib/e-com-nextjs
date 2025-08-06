"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React from "react";
import CustomBreadcrumb from "@/components/smallComponent/Breadcrumb";
import { BsBoxSeamFill } from "react-icons/bs";
import Link from "next/link";
import { login as loginUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import axios from "axios";

import animateBackgorund from "@/../public/register.svg";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Login", active: true },
];

const FormSchema = z.object({
  email: z.email(),
  password: z.string().min(4, {
    // 6 or 8
    message: "Password must be at least 6 characters.",
  }),
});

function LoginPage() {
  const navigate = useRouter();
  const { login } = useAuth();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data_z: z.infer<typeof FormSchema>) => {
    try {
      const { data } = await loginUser({
        email: data_z.email,
        password: data_z.password,
      });

      if (data.access_token) {
        toast.success(data.message);
        await login(data.access_token);
        localStorage.setItem("authToken", data.access_token);
      } else {
        // toast.error("No access token found");
        throw new Error("No access token found");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        toast.error(
          err.response?.data?.message || err.message || "Something went wrong"
        );
      }
    }
  };

  return (
    <>
      <div className=" w-full h-screen grid lg:grid-cols-2 grid-cols-1">
        <div className=" w-full h-screen hidden lg:block relative">
          <Image
            src={animateBackgorund}
            alt="img"
            className=" h-screen w-full"
          />
          <div className=" w-full h-full absolute dark:bg-[#121728d2] bg-[#0f1130d8] top-0 left-0"></div>
        </div>
        <div className=" w-full h-screen dark:bg-gray-900  px-2 lg:px-5 xl:px-10 py-2 lg:py-3 xl:py-10 relative">
          <div className=" absolute w-full top-0 left-0 py-7 lg:px-10">
            <div className="flex item-center justify-between w-full px-5">
              <CustomBreadcrumb items={breadcrumbItems} />
              <Link
                href={"/"}
                className=" flex items-center justify-between gap-1"
              >
                <BsBoxSeamFill className=" text-xl lg:text-3xl " />{" "}
                <p className=" lg:text-2xl font-bold"> E_com</p>
              </Link>
            </div>
          </div>
          {/* form start*/}
          <div className=" w-full flex items-center justify-center h-full">
            <Form {...form}>
              <form
                className=" lg:w-full xl:w-[450px] space-y-6 p-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className=" flex flex-col items-center justify-center text-center">
                  <h1 className=" py-2 text-3xl font-semibold tracking-wider mt-4">
                    Welcome Back.
                  </h1>
                  <p className=" text-lg text-gray-500">
                    Welcome to E_com - Let&apos;s Log in our web
                  </p>
                </div>

                <div className=" grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="johnDoe@mail.com"
                            // value={field.value as string}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className=" grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className=" w-full flex items-center justify-between ">
                          <FormLabel>Password</FormLabel>
                          <span
                            className=" text-xs underline underline-offset-1 text-blue-500 cursor-pointer"
                            onClick={() =>
                              toast.info("this page is under-construction!")
                            }
                          >
                            Forgot Password
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="password"
                            // value={field.value as string}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" space-y-3">
                  <Button type="submit" className=" w-full">
                    {/* <Loader2Icon className="animate-spin" /> */}
                    Log in
                  </Button>

                  <div className=" text-center">
                    <h4 className=" w-full text-gray-400 text-sm">
                      Create a Account ?{" "}
                      <Button
                        type="button"
                        variant={"link"}
                        size={"icon"}
                        className=" size-8 pl-4 text-blue-500 capitalize"
                        onClick={() => navigate.push("/register")}
                      >
                        {" "}
                        sign up
                      </Button>
                    </h4>
                  </div>
                </div>
              </form>
            </Form>
          </div>
          {/* form end */}
        </div>
      </div>
    </>
  );
}

export default LoginPage;
