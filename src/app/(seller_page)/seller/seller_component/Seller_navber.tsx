"use client";
import { CustomToolTip } from "@/components/custom_compoent/CustomToolTip";
import { Input } from "@/components/ui/input";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdOutlineOutput } from "react-icons/md";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";
import { ModeToggle } from "@/components/Theme_Button";
const Seller_navber = ({
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

  let logoutTimeout: ReturnType<typeof setTimeout> | null = null;

  const handleLogout = () => {
    // Show toast with Undo action
    toast("Logging out...", {
      action: {
        label: "Undo",
        onClick: () => {
          if (logoutTimeout) {
            clearTimeout(logoutTimeout);
            logoutTimeout = null;
            toast.info("Logout cancelled.");
          }
        },
      },
    });

    // Set 2 second delay for logout
    logoutTimeout = setTimeout(() => {
      logout();
      toast.success("You are logged out.");
    }, 5000);
  };

  return (
    <div className=" w-full dark:bg-slate-900 bg-white py-5 px-6 flex items-center justify-between border-b-[0.01] ">
      <div className=" flex items-center justify-start gap-6">
        <Button onClick={toggleSidebar} size={"icon"} variant={"secondary"}>
          {isOpen ? <FaAngleLeft /> : <FaAngleRight />}
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
            Seller Deshboard
          </p>
        </div>
      </div>
      <div className=" flex items-center justify-end gap-4">
        <div>
          <Input
            type="search"
            placeholder="Search here.."
            className=" dark:text-slate-600 "
          />
        </div>
        <div className=" flex gap-1">
          <ModeToggle />
        </div>
        <div className=" flex gap-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary" className="" size="sm">
                <FaUser /> Profile
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" text-sm" align="end">
              <p className=" capitalize">name: {user?.name}</p>
              <p className=" ">Email: {user?.email}</p>
              <p className=" capitalize">role: {user?.role}</p>
            </PopoverContent>
          </Popover>

          <CustomToolTip
            children={
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                <span className="flex items-center gap-2">
                  <MdOutlineOutput />
                  Log out
                </span>
              </Button>
            }
            bodyContent="log out"
          />
        </div>
      </div>
    </div>
  );
};

export default Seller_navber;
