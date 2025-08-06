"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React, { useState } from "react";
import CustomBreadcrumb from "@/components/smallComponent/Breadcrumb";
import {
  BsBoxSeamFill,
  BsFacebook,
  BsGoogle,
  BsTwitterX,
} from "react-icons/bs";
import Link from "next/link";
import { registerUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import animateBackgorund from "@/../public/register.svg";
import Image from "next/image";
const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Register", active: true },
];

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Enter valid name.",
  }),
  email: z.email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

function InputForm() {
  const [selectedRole, setSelectedRole] = useState<"user" | "admin">("user");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const route = useRouter();
  const handleSubmit = async (data_z: z.infer<typeof FormSchema>) => {
    try {
      const { data } = await registerUser({
        name: data_z.name,
        email: data_z.email,
        password: data_z.password,
        role: selectedRole, // pass the role
      });
      toast.success(data.message);
      route.push("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        toast.error(
          err.response?.data?.message || err.message || "Something went wrong"
        );
      }
    }
  };

  const navigate = useRouter();
  return (
    <>
      <div className=" w-full h-screen grid lg:grid-cols-2 grid-cols-1">
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
            {/* <div className=" px-5 lg:px-20 pt-5 ">
              <div className=" hidden lg:block">
                <h1 className=" lg:text-3xl font-semibold tracking-wider mt-4">
                  Get Started
                </h1>
                <p className=" text-lg text-gray-500">
                  Welcome to E_com - Let&apos;s create your account
                </p>
              </div>
            </div> */}
          </div>
          {/* form start*/}
          <div className=" w-full flex items-center justify-center h-full">
            <Form {...form}>
              <form
                className=" lg:w-full xl:w-[450px] space-y-6 p-5"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <div className=" flex flex-col items-center justify-center text-center">
                  <h1 className=" py-2 text-3xl font-semibold tracking-wider mt-4">
                    Get Started
                  </h1>
                  <p className=" text-lg text-gray-500">
                    Welcome to E_com - Let&apos;s create your account
                  </p>
                </div>
                <div className=" grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Mr John doe"
                            // value={field.value as string}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Please enter a vaid name
                        </FormDescription>
                      </FormItem>
                    )}
                  />
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
                {/* select role  */}
                <RadioGroup
                  value={selectedRole}
                  onValueChange={(value: "user" | "admin") =>
                    setSelectedRole(value)
                  }
                  className="grid grid-cols-2 gap-2"
                >
                  {/* Normal Account */}
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem
                      value="user"
                      id="r-user"
                      className="border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                    />
                    <Label htmlFor="r-user" className="cursor-pointer">
                      Normal Account
                    </Label>
                  </div>

                  {/* Business Account */}
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem
                      value="admin"
                      id="r-admin"
                      className="border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                    />
                    <Label htmlFor="r-admin" className="cursor-pointer">
                      Business Account
                    </Label>
                  </div>
                </RadioGroup>

                <div className=" space-y-3">
                  <Button type="submit" className=" w-full">
                    {/* <Loader2Icon className="animate-spin" /> */}
                    Sign Up
                  </Button>
                  <div className=" w-full py-2 relative">
                    <hr className="" />
                    <p className=" uppercase dark:bg-transparent bg-white text-sm text-gray-600 absolute top-0 right-1/2">
                      or
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-2 ">
                    <Button
                      disabled
                      type="button"
                      variant={"outline"}
                      className=" w-full"
                      size={"icon"}
                    >
                      <BsGoogle /> Continue with Google
                    </Button>
                    <div className=" grid grid-cols-2 gap-2">
                      <Button
                        disabled
                        type="button"
                        variant={"outline"}
                        className=" w-full"
                        size={"icon"}
                      >
                        <BsFacebook /> with Facebook
                      </Button>
                      <Button
                        disabled
                        type="button"
                        variant={"outline"}
                        className=" w-full"
                        size={"icon"}
                      >
                        <BsTwitterX /> with Twitter
                      </Button>
                    </div>
                  </div>
                  <div className=" text-center">
                    <h4 className=" w-full text-gray-400 text-sm">
                      Already have a Account ?{" "}
                      <Button
                        type="button"
                        variant={"link"}
                        size={"icon"}
                        className=" size-8 pl-4 text-blue-500 capitalize"
                        onClick={() => navigate.push("/login")}
                      >
                        {" "}
                        sign in
                      </Button>
                    </h4>
                  </div>
                </div>
              </form>
            </Form>
          </div>
          {/* form end */}
        </div>
        <div className=" w-full h-screen hidden lg:block relative">
          <Image
            src={animateBackgorund}
            alt="img"
            className=" h-screen w-full"
          />
          <div className=" w-full h-full absolute dark:bg-[#121728d2] bg-[#0f1130d8] top-0 left-0"></div>
        </div>
      </div>
    </>
  );
}

export default InputForm;
