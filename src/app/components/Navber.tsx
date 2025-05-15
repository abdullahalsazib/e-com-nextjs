import React from "react";
import Topbar from "./Topbar/Topbar";
import { BsBoxSeamFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { LuShoppingCart } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";

const navLink = [
  { title: "Laptops", dropDown: true },
  { title: "Desktop PCs", dropDown: true },
  { title: "Networking Devices", dropDown: true },
  { title: "Printers & Scanners", dropDown: true },
  { title: "PC parts", dropDown: true },
  { title: "All Other Products", dropDown: true },
  { title: "Repairs", dropDown: true },
];

export default function Navber() {
  return (
    <>
      <div className=" w-full text-black ">
        <Topbar />
        <nav className=" border-b border-b-gray-300 bg-white py-5 px-[10%] flex items-center justify-between ">
          <div className="flex items-centere justify-center gap-20">
            <BsBoxSeamFill className="text-5xl text-blue-600" />

            {/* navlinks */}
            <ul className="flex items-center justify-center gap-7">
              {navLink.map((item, index) => (
                <li
                  className=" text-sm font-semibold text-black hover:text-blue-500 duration-300 transition-colors cursor-pointer"
                  key={index}
                >
                  {item.title}
                </li>
              ))}
              <button className="border-2 text-sm border-blue-500 rounded-full py-1.5 px-5 bg-white  text-blue-500 hover:bg-blue-500 hover:text-white active:scale-105 font-bold duration-300 transition-colors capitalize cursor-pointer">
                our deals
              </button>
            </ul>
          </div>
          {/* right section */}
          <div className="flex items-center justify-center gap-6">
            <button className=" text-2xl font-bold">
              <BiSearch />
            </button>
            <button className=" text-2xl font-bold">
              <LuShoppingCart />
            </button>
            <button className=" text-3xl font-bold">
              <FaUserCircle />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
