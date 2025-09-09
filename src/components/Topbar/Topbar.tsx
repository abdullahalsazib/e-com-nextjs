"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
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
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useClickOutside } from "@/hooks/useClickOutSide";
const HelpSupport = [
  { label: "Help Center", href: "#", icon: <MdHelpCenter /> },
  {
    label: "Contact Customer Care",
    href: "#",
    icon: <RiCustomerServiceLine />,
  },
  { label: "Shipping & Delivery", href: "#", icon: <MdLocalShipping /> },
];

const LinkPage = [
  { title: "home", link: "/" },
  // { title: "about", link: "/pages/about" },
  { title: "Product's", link: "/pages/products" },
  { title: "contact us", link: "/pages/contactus" },
  { title: "faq", link: "/pages/faq" },
];
const Topbar = () => {
  const { user, isAuthenticated } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [onHover, setOnHover] = useState(false);

  const openMenuRef = useRef<HTMLDivElement | null>(null);
  const onHOverRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(onHOverRef, () => {
    if (onHover) setOnHover(false);
  });
  useClickOutside(openMenuRef, () => {
    if (openMenu) setOpenMenu(false);
  });
  const isUserRole = hasRole(user?.roles, "user");

  // Vendor check
  const vendor = user?.vendor || null;
  const isVendor = !!vendor;

  return (
    <div className="w-full py-1 px-3 lg:px-5 xl:px-[10%] bg-gradient-to-r from-gray-700 to-white/10 dark:to-blue-800 dark:from-blue-900 hidden md:flex flex-col md:flex-row items-center justify-between gap-2">
      {/* Left Section */}
      <div className="flex items-center gap-4 text-white">
        {/* menu clike to open all category as selection */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className=" cursor-pointer border border-transparent hover:border-white duration-300 p-1 active:scale-110 flex items-center justify-center gap-1"
        >
          <Menu /> All
        </button>

        <div>
          <ul className=" capitalize text-[13px]  flex items-center justify-center gap-">
            <li className=" relative">
              <button
                onMouseEnter={() => setOnHover(true)}
                className="  border border-transparent hover:border-1 hover:border-white/50 duration-100 py-2 px-4"
              >
                Pages
              </button>
              <div
                ref={onHOverRef}
                onMouseLeave={() => setOnHover(false)}
                className={` ${
                  onHover ? "absolute duration-300" : "hidden"
                } top-9 left-4 py-4 bg-white min-w-[200px] min-h-full  z-50`}
              >
                <ul className=" text-black py-2 px-3 flex items-start justify-start flex-col gap-5">
                  {LinkPage.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.link}
                        className=" text-sm py-1.5 border-black/30 hover:border-black duration-300 border-1 px-5 hover:underline cursor-pointer"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <Link
                href={"/pages/products"}
                className=" border border-transparent hover:border-1 hover:border-white/50 duration-100 py-2 px-4"
              >
                Today&apos;s deals
              </Link>
            </li>
            <li>
              <Link
                href={"/pages/products"}
                className=" border border-transparent hover:border-1 hover:border-white/50 duration-100 py-2 px-4"
              >
                Buy again
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className=" border border-transparent hover:border-1 hover:border-white/50 duration-100 py-2 px-4"
              >
                Customer Service
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className=" border border-transparent hover:border-1 hover:border-white/50 duration-100 py-2 px-4"
              >
                gift cards
              </Link>
            </li>
            <li>
              <Link
                href={"/register"}
                className=" bg-gradient-to-tl from-black dark:to-blue-600/40 to-blue-500 hover:bg-gradient-to-br duration-300  rounded-full border-none hover:border-1 hover:border-white/50  py-2 px-4"
              >
                Vendor&apos;s
              </Link>
            </li>
          </ul>
        </div>
        <motion.div
          ref={openMenuRef}
          initial={{
            opacity: 0,
            x: -1000,
          }}
          animate={{
            opacity: 1,
            x: openMenu ? 0 : -1000,
          }}
          transition={{
            duration: 0.5,
          }}
          className={` ${
            openMenu ? "absolute" : " absolute"
          } top-0 left-0 w-80 px-2  h-full z-50 bg-black `}
        >
          <div className=" py-3 px-2 flex items-center justify-end ">
            <button className=" cursor-pointer p-2 hover:text-gray-500 duration-300">
              <X onClick={() => setOpenMenu(false)} className=" w-8 h-8" />
            </button>
          </div>
          Lorem, ipsum.
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex items-center flex-wrap justify-center gap-2 text-sm">
        {isAuthenticated && isUserRole && !isVendor && (
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
