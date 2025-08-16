/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { applyVendor } from "@/services/vendor.service";
import { useRouter } from "next/navigation";

// "shop_name": "Tech World jack",
//   "address": "Dhaka, Bangladesh",
//   "phone": "+8801712345678"
const FormSchema = z.object({
  shop_name: z.string().min(3, {
    message: "Enter valid shop name.",
  }),
  address: z.string().min(5, {
    message: "Enter valid address.",
  }),
  phone: z.string().min(10, {
    message: "Enter valid phone number.",
  }),
});
const page = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      shop_name: "",
      address: "",
      phone: "",
    },
  });

  const navigate = useRouter();
  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await applyVendor(data);
      console.log("Vendor application response:", response);
      // Simulate API call
      console.log("Form Data:", data);
      toast.success("Seller registration successful!");
      navigate.push("/");
      toast.info("waiting for super admin approval!!");
      // Redirect or perform other actions here
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to register seller.");
    }
  };
  return (
    <div className=" bg-white dark:bg-black text-black dark:text-white w-full h-screen flex items-center justify-center">
      <div>
        <div className=" absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-100 to-blue-300 dark:from-slate-700 dark:to-gray-800 opacity-50">
          {/* Background gradient */}
        </div>
      </div>
      <Form {...form}>
        <form
          className=" lg:w-full xl:w-[450px] space-y-6 p-5 z-50 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg bg-white dark:bg-gray-900"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className=" flex flex-col items-center justify-center text-center">
            <h1 className=" py-2 text-3xl font-semibold tracking-wider mt-4">
              Apply as a Vendor
            </h1>
            <p className=" text-lg text-gray-500">
              Become a seller and start your own shop on our platform. Fill in
              the details below to apply.
            </p>
          </div>
          <div className=" grid gap-3">
            <FormField
              control={form.control}
              name="shop_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Shop name"
                      // value={field.value as string}
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>Please enter a vaid name</FormDescription> */}
                </FormItem>
              )}
            />
          </div>
          <div className=" grid gap-3">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="address"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <div className=" w-full flex items-center justify-between ">
                    <FormLabel>Phone</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="+880"
                      // value={field.value as string}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className=" space-y-3">
            <Button
              type="submit"
              className="w-full flex items-center justify-center"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Apply Now"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default page;
