"use client";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { login as loginUser } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { BsBoxSeamFill } from "react-icons/bs";
import { MdArrowOutward } from "react-icons/md";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  email: z.string(),
  password: z.string().min(4, {
    message: "password must be at least 4 characters.",
  }),
});

const Login_d = () => {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle className="">
            <div className=" flex items-center justify-center flex-col gap-2">
              <BsBoxSeamFill className=" text-4xl" />
              <h1 className=" text-center">Wellcome to E_shop</h1>
            </div>
          </DialogTitle>
          <DialogDescription asChild>
            <p className=" text-center">
              Make changes to your profile here. Click save when you&apos;re
              done.
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@mai.com"
                      {...field}
                      value={field.value as string}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display email.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      {...field}
                      //   value={field.value as string}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display email.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className=" flex gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className=" cursor-pointer">
                Remember me
              </Label>
            </div>
            <Link
              href={"/"}
              className="text-sm flex underline text-blue-400 capitalize"
            >
              forgot password <MdArrowOutward />
            </Link>
          </div>
          {/* <div className="flex gap-3">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember Me</Label>
          </div> */}
        </div>
        <div className=" grid grid-cols-3 gap-3">
          <Button className="mt-5" type="submit">
            Submit
          </Button>
          <Button
            onClick={() => toast.info("Working this Register page")}
            className="mt-5"
            variant={"outline"}
            type="button"
          >
            Register
          </Button>
        </div>

        {/* <DialogFooter className=" mt-6">
          <div className=" flex items-center justify-center w-full">
            <Button variant={"link"}>Create a new account ?</Button>
          </div>
        </DialogFooter> */}
      </form>
    </Form>
  );
};

export default Login_d;
