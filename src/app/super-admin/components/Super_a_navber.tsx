"use client";
import { CustomToolTip } from "@/components/custom_compoent/CustomToolTip";
import { Input } from "@/components/ui/input";
import { FaLink } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdOutlineOutput } from "react-icons/md";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/context/AuthContext";
import { ModeToggle } from "@/components/Theme_Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BiBell } from "react-icons/bi";
import { useRouter } from "next/navigation";
import hasRole from "@/lib/role-extr";
import { Menu } from "lucide-react";
import { CgClose } from "react-icons/cg";
const Super_admin_navber = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: () => void;
}) => {
  const toggleSidebar = () => {
    setOpen();
    console.log(isOpen);
  };
  const { user, logout } = useAuth();
  const navigate = useRouter();
  return (
    <div className=" w-full dark:bg-slate-900 bg-white py-3 px-6 border-b-[0.01] ">
      <div className=" max-w-7xl mx-auto flex items-center justify-between ">
        <div className=" flex items-center justify-start gap-6">
          <Button onClick={toggleSidebar} size={"icon"} variant={"secondary"}>
            {isOpen ? <CgClose /> : <Menu />}
          </Button>
          <div>
            <span className=" flex items-center justify-start gap-1">
              <p className=" text-xs dark:text-gray-100 text-gray-500 font-normal capitalize flex">
                page {"/"}
              </p>

              <p className=" text-xs dark:text-gray-400 text-gray-500 font-semibold capitalize">
                {" "}
                Deahboard
              </p>
            </span>

            <p className=" dark:text-slate-100 text-gray-800 font-semibold text-xl">
              Super Admin Panel
            </p>
          </div>
        </div>
        <div className=" flex items-center justify-end gap-3">
          <div>
            <Input
              type="search"
              placeholder="Search here.."
              className=" dark:text-slate-600 "
            />
          </div>
          <div>
            <CustomToolTip
              // eslint-disable-next-line react/no-children-prop
              children={
                <Button
                  variant={"secondary"}
                  size={"sm"}
                  onClick={() => navigate.push("/")}
                >
                  <FaLink />
                </Button>
              }
              bodyContent="Back to the web-site"
            />
          </div>
          <div className=" flex gap-1">
            <ModeToggle />
          </div>
          <div className=" flex gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary" className="" size="sm">
                  <BiBell />
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" text-sm" align="end">
                notification content - comming soon
              </PopoverContent>
            </Popover>
          </div>
          <div className=" flex gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary" className="" size="sm">
                  <FaUser /> Profile
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" text-sm" align="end">
                <div className="flex items-start justify-start flex-col gap-5">
                  <div>
                    <p className=" text-sm capitalize">{user?.name}</p>
                    <p className=" text-sm capitalize">{user?.email}</p>
                    <p className=" text-sm capitalize">
                      {hasRole(user?.roles, "superadmin")
                        ? "super Admin"
                        : "user"}
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size={"sm"} variant={"outline"}>
                        log out <MdOutlineOutput />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will log out your
                          system .
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction color="red" onClick={() => logout()}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </PopoverContent>
            </Popover>

            {/* <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"secondary"} size={"sm"}>
                log out <MdOutlineOutput />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will log out your system .
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => logout()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Super_admin_navber;
