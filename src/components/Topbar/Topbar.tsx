"use client";

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
import { useAuth } from "@/context/AuthContext";
import hasRole from "@/lib/role-extr";
const HelpSupport = [
  { label: "Help Center", href: "#", icon: <MdHelpCenter /> },
  {
    label: "Contact Customer Care",
    href: "#",
    icon: <RiCustomerServiceLine />,
  },
  { label: "Shipping & Delivery", href: "#", icon: <MdLocalShipping /> },
];

const Topbar = () => {
  const { user, isAuthenticated } = useAuth();

  const isSuperAdmin = hasRole(user?.roles, "superadmin");
  // const isAdmin = hasRole(user?.roles, "admin");
  const isUserRole = hasRole(user?.roles, "user");

  // Vendor check
  const vendor = user?.vendor || null;
  const isVendor = !!vendor;

  // Vendor status message
  const vendorStatusMsg = vendor
    ? vendor.vendor_status === "pending"
      ? "Pending for Super Admin Approval!"
      : vendor.vendor_status === "approved"
        ? "Vendor is approved"
        : vendor.vendor_status === "rejected"
          ? "Vendor is rejected"
          : vendor.vendor_status === "suspended"
            ? "Vendor is suspended"
            : "Unknown status"
    : null;

  return (
    <div className="w-full py-1 px-3 lg:px-5 xl:px-[10%] bg-gradient-to-r from-blue-700 to-blue-400 dark:to-blue-800 dark:from-blue-900 hidden md:flex flex-col md:flex-row items-center justify-between gap-2">
      {/* Left Section */}
      <div className="flex items-center gap-4 text-white">
        <Link href="/" className="text-sm whitespace-nowrap">
          <span className="font-semibold">E-COM</span> Next.js
        </Link>
        <div className="hidden lg:flex items-center gap-2 text-xs">
          <span>Call Us:</span>
          <span className="font-semibold">+880 123 456 789</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center flex-wrap justify-center gap-2 text-sm">


        {isAuthenticated && isUserRole && !isVendor &&  (
          <Link href="/register/become-vendor">
            <Button
              variant="link"
              size="sm"
              className="text-white uppercase hidden md:inline-flex"
            >
              <CiShop /> Become a Seller
            </Button>
          </Link>
        )}

        {/* Help & Support */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="link"
              size="sm"
              className="text-xs text-white uppercase hidden md:inline-flex"
            >
              Help & Support
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className=" bg_blur_effect">
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
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Auth Buttons */}
        {!isAuthenticated && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  size="sm"
                  className="text-white uppercase text-xs"
                >
                  Log In
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg_blur_effect">
                <Login_d />
              </DialogContent>
            </Dialog>
            <Link href="/register">
              <Button
                variant="link"
                size="sm"
                className="text-white uppercase hidden md:inline-flex text-xs"
              >
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Topbar;
