import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { CiShop } from "react-icons/ci";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTrigger } from "../ui/dialog";
import Login_d from "@/app/(auth)/login/components/Login_d";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MdHelpCenter, MdLocalShipping } from "react-icons/md";
import { RiCustomerServiceLine } from "react-icons/ri";

const HelpSupport = [
  { label: "Help Center", href: "#", icon: <MdHelpCenter /> },
  {
    label: "Contact Customer Care",
    href: "#",
    icon: <RiCustomerServiceLine />,
  },
  { label: "Shipping & Delivary", href: "", icon: <MdLocalShipping /> },
];

const Topbar = () => {
  return (
    <>
      <div className=" w-full py-0.5 px-2 lg:px-5 xl:px-[10%] bg-black flex items-center justify-end ">
        <div className=" flex items-center text-sm ">
          <Link href="/">
            <Button
              variant={"link"}
              size={"default"}
              className="text-white uppercase"
            >
              <CiShop /> Become a Seller
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"link"}
                size={"sm"}
                className=" text-sm text-white uppercase"
              >
                Help & Support
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {HelpSupport.map((item) => (
                <DropdownMenuItem key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-sm"
                  >
                    {item.icon} {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              {/* <DropdownMenuItem></DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog>
            {/* Trigger should be outside the form */}
            <DialogTrigger asChild>
              <Button
                variant={"link"}
                size={"sm"}
                className="text-white uppercase"
              >
                log in
              </Button>
            </DialogTrigger>

            {/* Form starts inside DialogContent */}
            <DialogContent className="sm:max-w-[425px]">
              <Login_d />
            </DialogContent>
          </Dialog>
          <Link href="/register">
            <Button
              variant={"link"}
              size={"sm"}
              className="text-white uppercase"
            >
              sign up
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Topbar;
