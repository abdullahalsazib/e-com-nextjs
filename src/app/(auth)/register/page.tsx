// "use client";
// import LoginBtn from "@/components/buttons/LoginBtn";
// import Breadcrumb from "@/components/smallComponent/Breadcrumb";
// import { Button } from "@/components/ui/button";
// import { registerUser } from "@/services/auth.service";
// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { GoSignIn } from "react-icons/go";
// import { toast } from "sonner";

// interface FormDataType {
//   name: string;
//   email: string;
//   password: string;
//   role: string;
// }
// const breadcrumb = [
//   { label: "Home", link: "/" },
//   { label: "Register", active: true },
// ];

// const RegisterPage = () => {
//   const route = useRouter();
//   const [Loading, setIsLoading] = useState<boolean>(false);
//   const [formData, setFormData] = useState<FormDataType>({
//     name: "",
//     email: "",
//     password: "",
//     role: "user",
//   });
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       // Add client-side validation
//       // if (formData.password.length < 6) {
//       //   setError("Password must be at least 6 characters");
//       //   return;
//       // }

//       const { data } = await registerUser({
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         role: formData.role,
//       });

//       // console.log("Registration successful:", data.message);

//       toast.success(data.message);
//       route.push("/login");
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         setError(
//           err.response?.data?.message ||
//             err.response?.data?.error ||
//             err.message ||
//             "Registration failed. Please try again."
//         );
//         toast.error(
//           err.response?.data?.message ||
//             err.response?.data?.error ||
//             err.message ||
//             "Registration failed. Please try again."
//         );
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 text-black">
//       <div className="mt-5">
//         <Breadcrumb items={breadcrumb} />

//         <h1 className="text-2xl sm:text-3xl font-semibold capitalize py-3">
//           Create an Customer Account
//         </h1>
//       </div>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
//       <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-8">
//         {/* Registration Form */}
//         <div className="bg-[#F5F7FF] p-6 sm:p-8 md:p-10 w-full rounded-lg shadow-sm">
//           <h1 className="text-lg md:text-xl font-bold capitalize pb-5">
//             Personal Information
//           </h1>
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//               <div className="space-y-2">
//                 <label
//                   htmlFor="firstName"
//                   className="block text-sm font-medium"
//                 >
//                   First Name
//                 </label>
//                 <input
//                   id="firstName"
//                   type="text"
//                   placeholder="Your first name"
//                   disabled
//                   className="cursor-not-allowed mt-1 py-2 sm:py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label htmlFor="lastName" className="block text-sm font-medium">
//                   Last Name
//                 </label>
//                 <input
//                   id="lastName"
//                   type="text"
//                   placeholder="Your last name"
//                   disabled
//                   className=" cursor-not-allowed  mt-1 py-2 sm:py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
//                 />
//               </div>{" "}
//             </div>
//             <div className=" w-full">
//               <label htmlFor="name" className="block text-sm font-medium">
//                 Name
//               </label>
//               <input
//                 id="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required
//                 placeholder="Your name"
//                 className="   mt-1 py-2 sm:py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
//               />
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="email" className="block text-sm font-medium">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 required
//                 placeholder="Your email"
//                 className="mt-1 py-2 sm:py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//               <div className="space-y-2">
//                 <label htmlFor="password" className="block text-sm font-medium">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                   required
//                   placeholder="Your password"
//                   className="mt-1 py-2 sm:py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
//                 />
//               </div>
//             </div>

//             <div className="pt-4">
//               {/* <LoginBtn
//                 title={Loading ? "Creating Account..." : "Create Account"}
//                 className="w-full md:w-auto"
//               /> */}
//               <Button
//                 type="submit"
//                 disabled={Loading}
//                 size={"lg"}
//                 variant={"secondary"}
//               >
//                 {Loading ? "Creating Account..." : "Create Account"}
//               </Button>
//             </div>
//           </form>
//         </div>

//         {/* Login Panel */}
//         <div className="bg-[#F5F7FF] text-black p-6 sm:p-8 md:p-10 w-full rounded-lg shadow-sm flex flex-col items-start gap-6 lg:gap-8">
//           <h1 className="text-xl sm:text-2xl font-semibold capitalize">
//             Already have an account?
//           </h1>

//           <div className="space-y-2">
//             <p className="text-sm sm:text-base font-light">
//               Sign in to access your account and enjoy these benefits:
//             </p>
//             <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
//               <li>Faster checkout</li>
//               <li>Order history</li>
//               <li>Saved addresses</li>
//               <li>Wishlist items</li>
//             </ul>
//           </div>

//           {/* <LoginBtn
//             href="/login"
//             title="Sign in"
//             className="w-full md:w-auto"
//           /> */}
//           <Link href={"/login"}>
//             <Button variant={"secondary"}>
//               {" "}
//               Sign in
//               <GoSignIn />
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

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
  FormMessage,
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
import { Loader2Icon } from "lucide-react";
import { registerUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

  return (
    <>
      <div className=" w-full h-screen grid grid-cols-2">
        <div className=" w-full h-screen bg-gray-900 lg:px-10 lg:py-10">
          <div className="flex item-center justify-between">
            <CustomBreadcrumb items={breadcrumbItems} />
            <Link href={"/"} className="flex items-center justify-end gap-1">
              <BsBoxSeamFill className="lg:text-2xl text-white" /> E_com
            </Link>
          </div>
          <div className=" py-5">
            <h1 className=" lg:text-3xl font-semibold tracking-wider mt-10">
              Get Started
            </h1>
            <p className=" text-lg text-gray-500">
              Welcome to E_com - Let's create your account
            </p>
          </div>
          {/* form */}
          <div className=" w-full flex items-center justify-center">
            <Form {...form}>
              <form
                className=" w-1/2 space-y-6 p-5"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
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
                    <p className=" uppercase bg-gray-900 text-sm text-gray-600 absolute top-0 right-1/2">
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
                        variant={"link"}
                        size={"icon"}
                        className=" size-8 pl-4 text-blue-500 capitalize"
                        onClick={() =>
                          toast.info("this page is under-construction!")
                        }
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
        </div>
        <div className=" w-full h-screen bg-slate-700"></div>
      </div>
    </>
  );
}

export default InputForm;

// <div className="  w-full h-screen bg-gradient-to-t from-slate-800 to-slate-900 ">
//   {" "}
//   <div className=" w- py-4 absolute top-20 px-[10%] text-black">
//     <CustomBreadcrumb items={breadcrumbItems} />
//     <div className=" pt-10">
//       <h1 className=" text-gray-300 font-bold tracking-wider text-3xl py-3">
//         Create an account
//       </h1>
//     </div>
//   </div>
//   <div className="  flex items-center justify-center w-full h-full">
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className=" space-y-6  w-[400px] p-5 rounded-lg"
//       >
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Enter you name: </FormLabel>
//               <FormControl>
//                 <Input
//                   type="text"
//                   placeholder="john doe"
//                   {...field}
//                   value={field.value as string}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email: </FormLabel>
//               <FormControl>
//                 <Input
//                   type="email"
//                   placeholder="john1doe@mail.com"
//                   {...field}
//                   value={field.value as string}
//                 />
//               </FormControl>
//               <FormDescription>
//                 This is your public display email.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input type="password" placeholder="******" {...field} />
//               </FormControl>
//               <FormDescription>Must be at least 6 characters.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   </div>
// </div>;
