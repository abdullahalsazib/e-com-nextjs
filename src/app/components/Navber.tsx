"use client";
import React, { useState, useEffect } from "react";
import Topbar from "./Topbar/Topbar";
import { BsBoxSeamFill } from "react-icons/bs";
import { BiSearch, BiArrowToTop } from "react-icons/bi";
import { LuShoppingCart } from "react-icons/lu";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { PiX } from "react-icons/pi";

const navLink = [
  { title: "Laptops", dropDown: true },
  { title: "Desktop PCs", dropDown: true },
  { title: "Networking Devices", dropDown: true },
  { title: "Printers & Scanners", dropDown: true },
  { title: "PC parts", dropDown: true },
  { title: "All Other Products", dropDown: true },
  { title: "Repairs", dropDown: true },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled more than 100vh
      if (window.scrollY > window.innerHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Show scroll-to-top button when scrolled down
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className={`w-full text-black ${
          isScrolled ? "fixed top-0 left-0 z-50 shadow-md" : ""
        }`}
      >
        <Topbar />
        <nav className="border-b border-b-gray-300 bg-white py-5 px-4 lg:px-5 xl:px-[10%] flex items-center justify-between">
          <div className="flex items-center justify-between w-full md:w-auto md:gap-10">
            <div className="flex items-center">
              <BsBoxSeamFill className="text-3xl md:text-5xl text-blue-600" />
            </div>

            {/* Desktop navlinks */}
            <ul className="hidden lg:flex items-center justify-center gap-7">
              {navLink.map((item, index) => (
                <li
                  className="text-sm font-semibold text-black hover:text-blue-500 duration-300 transition-colors cursor-pointer"
                  key={index}
                >
                  {item.title}
                </li>
              ))}
              <button className="border-2 text-sm border-blue-500 rounded-full py-1.5 px-5 bg-white text-blue-500 hover:bg-blue-500 hover:text-white active:scale-105 font-bold duration-300 transition-colors capitalize cursor-pointer">
                our deals
              </button>
            </ul>
          </div>

          {/* Desktop right section */}
          <div className="hidden lg:flex items-center justify-center gap-6">
            <button className="text-2xl font-bold">
              <BiSearch />
            </button>
            <button className="text-2xl font-bold">
              <LuShoppingCart />
            </button>
            <button className="text-3xl font-bold">
              <FaUserCircle />
            </button>
          </div>

          {/* Mobile right section */}
          <div className="flex lg:hidden items-center justify-center gap-4">
            <button className="text-xl font-bold">
              <BiSearch />
            </button>
            <button className="text-xl font-bold">
              <LuShoppingCart />
            </button>
            {/* Mobile menu button */}
            <button
              className="lg:hidden ml-4 text-2xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {!isMobileMenuOpen ? <FaBars /> : <PiX />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-lg">
            <ul className="flex flex-col items-start px-4 py-2">
              {navLink.map((item, index) => (
                <li
                  className="w-full py-3 border-b border-gray-200 text-sm font-semibold text-black hover:text-blue-500 duration-300 transition-colors cursor-pointer"
                  key={index}
                >
                  {item.title}
                </li>
              ))}
              <button className="w-full mt-3 border-2 text-sm border-blue-500 rounded-full py-1.5 px-5 bg-white text-blue-500 hover:bg-blue-500 hover:text-white active:scale-105 font-bold duration-300 transition-colors capitalize cursor-pointer">
                our deals
              </button>
              <li className="w-full py-3 flex items-center gap-2 text-sm font-semibold text-black hover:text-blue-500 duration-300 transition-colors cursor-pointer">
                <FaUserCircle className="text-xl" /> My Account
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Scroll to top button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <BiArrowToTop className="text-2xl" />
        </button>
      )}

      {/* Add padding to content when navbar is fixed */}
      {isScrolled && <div className="h-[110px] md:h-[120px]"></div>}
    </>
  );
}
