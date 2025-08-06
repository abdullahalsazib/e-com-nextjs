"use client";
import React, { useState, useEffect, useRef } from "react";
import Topbar from "./Topbar/Topbar";
import { BsBoxSeamFill } from "react-icons/bs";
import { BiSearch, BiArrowToTop, BiTrash } from "react-icons/bi";
import {
  FaUserCircle,
  FaBars,
  FaCcPaypal,
  FaCashRegister,
  FaSignInAlt,
  FaRegUserCircle,
} from "react-icons/fa";
import { PiX } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  accountNavagationLink,
  NavLink as navLink,
} from "../app/data/navegationLinks";
import { Item, NestedItem, SubItem } from "../app/type/type";
import { useAuth } from "../app/context/AuthContext";
import { toast } from "sonner";
import WishlistDropdown from "./WishlistDropdown";
import { useWishlist } from "../app/context/WishlistContext";
import CartListDropdown from "./CartListDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Login_d from "@/app/(auth)/login/components/Login_d";
import { FaBasketShopping } from "react-icons/fa6";
import { MdOutlineSell } from "react-icons/md";
import { ModeToggle } from "./Theme_Button";

export default function Navbar() {
  const router = useRouter();
  const [isDesktopSearch, setIsDesktopSearch] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeDropdowns, setActiveDropdowns] = useState<number[]>([]);
  const [activeNestedDropdowns, setActiveNestedDropdowns] = useState<{
    [key: string]: number[];
  }>({});
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // const dropdownRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { wishlist } = useWishlist();

  // useAuth
  const { user, isLoading, logout } = useAuth();
  // console.log(user);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      // Close mobile menu when resizing to desktop
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
      setShowScrollButton(window.scrollY > 300);
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

  const handleDropdownEnter = (index: number) => {
    if (!isMobile) {
      setActiveDropdowns((prev) => [...prev, index]);
    }
  };

  const handleDropdownLeave = (index: number) => {
    if (!isMobile) {
      setActiveDropdowns((prev) => prev.filter((i) => i !== index));
      setActiveNestedDropdowns((prev) => {
        const newState = { ...prev };
        delete newState[`${index}`];
        return newState;
      });
    }
  };

  const handleNestedEnter = (parentIndex: number, childIndex: number) => {
    if (!isMobile) {
      setActiveNestedDropdowns((prev) => ({
        ...prev,
        [`${parentIndex}`]: [...(prev[`${parentIndex}`] || []), childIndex],
      }));
    }
  };

  const handleNestedLeave = (parentIndex: number, childIndex: number) => {
    if (!isMobile) {
      setActiveNestedDropdowns((prev) => ({
        ...prev,
        [`${parentIndex}`]: (prev[`${parentIndex}`] || []).filter(
          (i) => i !== childIndex
        ),
      }));
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsMobileMenuOpen(false);
    setIsAccountDropdownOpen(false);
  };

  // const toggleAccountDropdown = () => {
  //   setIsAccountDropdownOpen(!isAccountDropdownOpen);
  // };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsAccountDropdownOpen(false);
    setIsCartOpen(false);
  };

  return (
    <>
      <div
        className={`w-full  ${
          isScrolled ? "fixed top-0 left-0 z-50 shadow-md" : ""
        }`}
      >
        <Topbar />
        <nav className=" dark:bg-black dark:text-white bg-white py-5 px-4 lg:px-5 xl:px-[10%] flex items-center justify-between">
          <div className="flex items-center justify-start w-full relative md:gap-10">
            <div className="flex items-center">
              <Link
                href="/"
                className=" flex items-center justify-center gap-2"
              >
                <BsBoxSeamFill className="text-2xl md:text-3xl text-blue-600" />
                <h1 className=" font-bold">E_shop</h1>
              </Link>
            </div>

            {/* Desktop nav-links */}
            <ul className="hidden lg:flex items-center justify-center gap-7 relative">
              {navLink.map((item, index) => (
                <li
                  key={index}
                  className="relative group"
                  onMouseEnter={() =>
                    item.dropDown && handleDropdownEnter(index)
                  }
                  onMouseLeave={() =>
                    item.dropDown && handleDropdownLeave(index)
                  }
                >
                  {item.dropDown ? (
                    <button
                      className="text-sm font-semibold dark:text-white text-black hover:text-blue-500 duration-300 transition-colors cursor-pointer py-2"
                      onClick={(e) => {
                        if (!item.dropDown && item.link) {
                          router.push(item.link);
                        } else {
                          e.preventDefault();
                        }
                      }}
                    >
                      {item.title}
                    </button>
                  ) : (
                    <Link href={item.link}>
                      <h1 className="text-sm font-semibold dark:text-white text-black hover:text-blue-500 duration-300 transition-colors cursor-pointer py-2">
                        {item.title}
                      </h1>
                    </Link>
                  )}

                  {/* Dropdown content */}
                  {item.dropDown && activeDropdowns.includes(index) && (
                    <div className="absolute -right-20 top-full mt-0 w-56 dark:bg-black dark:text-white bg-white shadow-lg rounded-b-md z-50 border-t-2 border-blue-500">
                      {item.content?.map((subItem, subIndex: number) => (
                        <div
                          key={subIndex}
                          className="relative"
                          onMouseEnter={() =>
                            handleNestedEnter(index, subIndex)
                          }
                          onMouseLeave={() =>
                            handleNestedLeave(index, subIndex)
                          }
                        >
                          <a
                            href={subItem.link}
                            className="block px-4 py-2 text-sm dark:text-white text-gray-600 dark:hover:text-gray-300 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            {subItem.title}
                          </a>
                          {subItem.nested &&
                            activeNestedDropdowns[index]?.includes(
                              subIndex
                            ) && (
                              <div className="absolute left-full top-0 ml-0 w-56 dark:bg-black bg-white text-gray-600 shadow-lg rounded-r-md z-50 border-l-2 border-blue-500 dark:hover:bg-gray-800">
                                {subItem.nested.map(
                                  (
                                    nestedItem: NestedItem,
                                    nestedIndex: number
                                  ) => (
                                    <a
                                      key={nestedIndex}
                                      href={nestedItem.link}
                                      className="block px-4 py-2 text-sm text-gray-500 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    >
                                      {nestedItem.title}
                                    </a>
                                  )
                                )}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop right section */}
          <div className="hidden lg:flex items-center justify-center gap-3 relative pr-0 md:px-10">
            <Popover
              open={isSearchOpen}
              onOpenChange={(open) => setIsSearchOpen(open)}
            >
              <PopoverTrigger asChild>
                <Button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  size="icon"
                  variant="secondary"
                  className="size-8"
                >
                  {isSearchOpen ? (
                    <CgClose className="size-4" />
                  ) : (
                    <Search className="size-4" />
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent align="end" className=" border-2 w-72">
                <Input type="search" placeholder="Search here..." />
              </PopoverContent>
            </Popover>
            <ModeToggle />
            {/* cart */}
            {/* wishlist */}
            {user?.role ? (
              <>
                {/* cart  */}
                <CartListDropdown />
                {/* wishlist  */}
                <WishlistDropdown />
              </>
            ) : (
              <WishlistDropdown />
            )}
            {/* Account */}
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size={"icon"}
                    variant={"secondary"}
                    className="size-9 rounded-full"
                    aria-label="User account"
                  >
                    <span>
                      <FaRegUserCircle />
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="  border-2">
                  <>
                    <div>
                      <ul className="space-y-3 text-sm ">
                        {user?.role == "admin" ? (
                          <>
                            <li>
                              <Link
                                href={"/seller"}
                                className="block hover:text-blue-500 transition-colors"
                              >
                                Seller Dashboard
                              </Link>
                            </li>
                          </>
                        ) : user?.role == "user" ? (
                          <>
                            <li>
                              <Link
                                href="/user-account"
                                className="block hover:text-blue-500 transition-colors"
                              >
                                My Account
                              </Link>
                            </li>

                            <li>
                              <Link
                                className="block hover:text-blue-500 transition-colors"
                                href={"/shoping-card"}
                              >
                                My Wish List {`(${wishlist.length})`}
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <Link
                                className="block hover:text-blue-500 transition-colors"
                                href={"/shoping-card"}
                              >
                                <Button variant="default" className=" w-full">
                                  <FaBasketShopping />
                                  My Wish List {`(${wishlist.length})`}
                                </Button>
                              </Link>
                            </li>
                          </>
                        )}

                        {isLoading && <h1>Loading data...</h1>}
                        {!user ? (
                          <>
                            {" "}
                            <li className="border-t border-gray-200 pt-3">
                              <Link
                                href="/register"
                                className="block hover:text-blue-500 transition-colors"
                              >
                                <Button variant="outline" className=" w-full">
                                  <FaCashRegister />
                                  Create an Account
                                </Button>
                              </Link>
                            </li>
                            <li>
                              <Dialog>
                                {/* Trigger should be outside the form */}
                                <DialogTrigger asChild>
                                  <Button variant="outline" className=" w-full">
                                    <FaSignInAlt />
                                    Sign In
                                  </Button>
                                </DialogTrigger>

                                {/* Form starts inside DialogContent */}
                                <DialogContent className="sm:max-w-[425px]">
                                  <Login_d />
                                </DialogContent>
                              </Dialog>
                            </li>
                          </>
                        ) : (
                          <li onClick={handleLogout}>
                            <p className=" cursor-pointer block hover:text-blue-500 transition-colors">
                              Log out
                            </p>
                          </li>
                        )}
                      </ul>
                    </div>
                  </>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Mobile right section */}
          <div className="flex lg:hidden items-center justify-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size={"icon"}
                  variant={"secondary"}
                  className="size-9 rounded-full"
                  aria-label="User account"
                >
                  <span>
                    <FaRegUserCircle />
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="center" className="  border-2">
                <>
                  <div>
                    <ul className="space-y-3 text-sm ">
                      {user?.role == "admin" ? (
                        <>
                          <li>
                            <Link
                              href={"/seller"}
                              className="block hover:text-blue-500 transition-colors"
                            >
                              Seller Dashboard
                            </Link>
                          </li>
                        </>
                      ) : user?.role == "user" ? (
                        <>
                          <li>
                            <Link
                              href="/user-account"
                              className="block hover:text-blue-500 transition-colors"
                            >
                              My Account
                            </Link>
                          </li>

                          <li>
                            <Link
                              className="block hover:text-blue-500 transition-colors"
                              href={"/shoping-card"}
                            >
                              My Wish List {`(${wishlist.length})`}
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link
                              className="block hover:text-blue-500 transition-colors"
                              href={"/shoping-card"}
                            >
                              <Button variant="default" className=" w-full">
                                <FaBasketShopping />
                                My Wish List {`(${wishlist.length})`}
                              </Button>
                            </Link>
                          </li>
                        </>
                      )}

                      {isLoading && <h1>Loading data...</h1>}
                      {!user ? (
                        <>
                          {" "}
                          <li className="border-t border-gray-200 pt-3">
                            <Link
                              href="/register"
                              className="block hover:text-blue-500 transition-colors"
                            >
                              <Button variant="outline" className=" w-full">
                                <FaCashRegister />
                                Create an Account
                              </Button>
                            </Link>
                          </li>
                          <li>
                            <Dialog>
                              {/* Trigger should be outside the form */}
                              <DialogTrigger asChild>
                                <Button variant="outline" className=" w-full">
                                  <FaSignInAlt />
                                  Sign In
                                </Button>
                              </DialogTrigger>

                              {/* Form starts inside DialogContent */}
                              <DialogContent className="sm:max-w-[425px]">
                                <Login_d />
                              </DialogContent>
                            </Dialog>
                          </li>
                        </>
                      ) : (
                        <li onClick={handleLogout}>
                          <p className=" cursor-pointer block hover:text-blue-500 transition-colors">
                            Log out
                          </p>
                        </li>
                      )}
                    </ul>
                  </div>
                </>
              </PopoverContent>
            </Popover>
            <ModeToggle />
            {user?.role ? (
              <>
                {/* cart  */}
                <CartListDropdown />
                {/* wishlist  */}
                <WishlistDropdown />
              </>
            ) : (
              <WishlistDropdown />
            )}
            <button
              className="lg:hidden ml-4 text-2xl mobile-menu-toggle"
              onClick={toggleMobileMenu}
            >
              {!isMobileMenuOpen ? <FaBars /> : <PiX />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden dark:bg-black dark:text-white bg-white shadow-lg"
            ref={mobileMenuRef}
          >
            <ul className="flex flex-col items-start px-4 py-2">
              {navLink.map((item, index) => (
                <MobileNavItem key={index} item={item} index={index} />
              ))}
              <li className="w-full py-3">
                {accountNavagationLink.map((item, index) => (
                  <MobileNavItem key={index} item={item} index={index} />
                ))}
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

const MobileNavItem = ({ item, index }: { item: Item; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <h4
      key={index}
      className="w-full py-3 border-b dark:border-gray-700 border-gray-200 capitalize"
    >
      <div
        className="flex justify-between items-center text-sm font-semibold dark:text-white text-black hover:text-blue-500 duration-300 transition-colors cursor-pointer"
        onClick={() => {
          if (item.dropDown) {
            setIsOpen(!isOpen);
          } else if (item.link) {
            window.location.href = item.link;
          }
        }}
      >
        {item.title}
        {item.dropDown && (
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </div>

      {/* First level dropdown */}
      {item.dropDown && isOpen && (
        <div className="pl-4 mt-2">
          {item.content?.map((subItem: SubItem, subIndex: number) => (
            <div key={subIndex}>
              <Link
                href={`${subItem.link}`}
                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
              >
                {subItem.title}
              </Link>

              {/* Second level nested dropdown */}
              {subItem.nested && (
                <div className="pl-4">
                  {subItem.nested.map(
                    (nestedItem: NestedItem, nestedIndex: number) => (
                      <Link
                        key={nestedIndex}
                        href={`${nestedItem.link}`}
                        className="block py-2 text-sm text-gray-500 hover:text-blue-500"
                      >
                        {nestedItem.title}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </h4>
  );
};
