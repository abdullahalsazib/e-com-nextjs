"use client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
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
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsBoxSeamFill } from "react-icons/bs";
import { MdArrowOutward } from "react-icons/md";
import { toast } from "sonner";
import z from "zod";
import { FaSpinner } from "react-icons/fa6";

const FormSchema = z.object({
  email: z.string().email("Invalid email address!"),
  password: z.string().min(4, {
    message: "password must be at least 4 characters.",
  }),
  remember: z.boolean().optional()
});

const Login_d = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });
  const onSubmit = async (data_z: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const startTime = Date.now();
    try {
      const { data } = await loginUser({
        email: data_z.email,
        password: data_z.password,
      });

      if (data.access_token) {
        toast.success(data.message);
        // navigate.push("/");
        await login(data.access_token);
        // localStorage.setItem("authToken", data.access_token);
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
    } finally {
      const elapsed = Date.now() - startTime;
      const minDelay = 5000; // 5s
      const remaining = minDelay - elapsed;

      if (remaining > 0) {
        setTimeout(() => setLoading(false), remaining);
      } else {
        setLoading(false);
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
          <DialogDescription
            asChild
            className=" text-slate-800 dark:text-slate-300"
          >
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
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="remember"
                    checked={field.value} // bind checked state
                    onCheckedChange={field.onChange} // update form value
                  />
                  <Label htmlFor="remember" className="cursor-pointer">
                    Remember me
                  </Label>
                </div>
              )}
            />

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
          <Button disabled={loading} className="mt-5" type="submit">
            {loading ? <FaSpinner className=" animate-spin" /> : "Login"}
          </Button>
          <Button
            onClick={() => navigate.push("/register")}
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
