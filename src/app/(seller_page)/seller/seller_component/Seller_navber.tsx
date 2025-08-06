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
    <div className=" w-full bg-white py-5 px-6 flex items-center justify-between border-b-[0.01] border-b-slate-200 shadow-lg shadow-gray-100">
      <div className=" flex items-center justify-start gap-6">
        <button
          onClick={toggleSidebar}
          className=" text-2xl border border-slate-200 rounded-sm cursor-pointer active:bg-slate-100"
        >
          {isOpen ? (
            <FaAngleLeft className=" text-slate-600" />
          ) : (
            <FaAngleRight className=" text-slate-600" />
          )}
        </button>
        <div>
          <span className=" flex items-center justify-center gap-1">
            <p className=" text-xs text-gray-500 font-normal capitalize flex">
              page {"/"}
            </p>

            <p className=" text-xs text-gray-500 font-semibold capitalize">
              {" "}
              Deahboard
            </p>
          </span>

          <p className=" text-gray-800 font-semibold text-xl">Seller</p>
        </div>
      </div>
      <div className=" flex items-center justify-end text-black gap-4">
        <div>
          <Input
            type="search"
            placeholder="Search here.."
            className=" dark:text-slate-600 "
          />
        </div>
        <div className=" flex gap-1">
          <Popover>
            <PopoverTrigger>
              <Button
                variant="outline"
                className="hover:text-violet-400"
                size="sm"
              >
                <span>
                  <FaUser /> Profile
                </span>
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
