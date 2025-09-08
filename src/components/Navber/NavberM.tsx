"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiArrowToTop, BiX } from "react-icons/bi";
import { BsBoxSeamFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping, FaRegUser } from "react-icons/fa6";
import { RiMenu2Fill } from "react-icons/ri";
import Topbar from "../Topbar/Topbar";
import { useClickOutside } from "@/hooks/useClickOutSide";
import CartListNew from "../CartListNew";
import WishlistNew from "../WishlistNew";
import { ModeToggle } from "../Theme_Button";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useAuth } from "@/context/AuthContext";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import hasRole from "@/lib/role-extr";
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
} from "../ui/alert-dialog";
import Login_d from "@/app/(auth)/login/components/Login_d";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTrigger } from "../ui/dialog";
import { useCart } from "@/context/CartListContext";
import { useWishlist } from "@/context/WishlistContext";

const NavberM = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [wishlistOpen, setWishlistOpen] = useState<boolean>(false);
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  // cart and wishlist count
  const { cartItemCount } = useCart();
  const { wishlist } = useWishlist();

  // cart er jonno ref
  const cartRef = useRef<HTMLDivElement | null>(null);
  const wishlistRef = useRef<HTMLDivElement | null>(null);

  // hook use
  useClickOutside(cartRef, () => {
    if (cartOpen) setCartOpen(false);
  });
  useClickOutside(wishlistRef, () => {
    if (wishlistOpen) setWishlistOpen(false);
  });

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

  return (
    <>
      <div
        className={` border-b ${isScrolled
          ? "fixed top-0 left-0 z-50 shadow-md w-full bg-white/10 backdrop-blur-md "
          : " w-full bg-black"
          }`}
      >
        <div className={`${isScrolled ? "hidden" : "block"}`}>
          <Topbar />
        </div>

        <div className=" w-full py-1 px-3 lg:px-5 xl:px-[10%] flex flex-row items-center justify-between gap-3 lg:gap-4 bg-white dark:bg-black  lg:relative">
          {/* left section */}
          {/* logo and brand */}
          <Link href={"/"}>
            <div className=" uppercase text-black dark:text-white font-semibold flex items-center justify-center gap-2">
              <BsBoxSeamFill className=" text-2xl  " />
              <p>E-Shop</p>
            </div>
          </Link>
          {/* center section */}
          <div className=" w-full hidden md:block flex-1">
            <input
              type="search"
              placeholder="Search for products, categories or brands..."
              className=" w-full bg-transparent xl:py-2 xl:px-5 py-2 px-4 rounded-sm text-slate-600 dark:text-slate-300 border-[0.5] border-gray-200 dark:border-gray-800 focus:outline-1 focus:outline-gray-400 dark:focus:outline-gray-700 duration-300 text-sm"
            />
          </div>
          {/* right section */}
          <div className=" py-3 flex items-center justify-center gap-1">
            <div className=" flex items-center justify-center flex-row gap-3">
              {!isAuthenticated && (
                <div className=" hidden md:flex items-start justify-start flex-col -space-y-1">
                  <p className=" text-xs text-gray-600 dark:text-gray-400">
                    {" "}
                    Sign in
                  </p>
                  <p className=" font-bold text-black  dark:text-white text-sm">
                    Account
                  </p>
                </div>
              )}

              <Popover>
                <PopoverTrigger asChild>
                  <Button size={"icon"} variant={"outline"}>
                    <FaRegUser className="text-xl" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className=" border-none px-2 py-1 w-auto bg_blur_effect"
                >
                  <>
                    <div>
                      <ul className="flex flex-col items-start justify-center ">
                        {hasRole(user?.roles, "superadmin") ? (
                          <>
                            <li>
                              <Link
                                href={`/dashboard/${user?.name}`}
                                className="block hover:text-blue-500 transition-colors"
                              >
                                <Button variant={"link"} size={"sm"}>
                                  My Account
                                </Button>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/super-admin"
                                className="block hover:text-blue-500 transition-colors"
                              >
                                <Button variant={"link"} size={"sm"}>
                                  Super admin
                                </Button>
                              </Link>
                            </li>
                          </>
                        ) : hasRole(user?.roles, "admin") ? (
                          <>
                            <li>
                              <Link
                                href={`/dashboard/${user?.name}`}
                                className="block hover:text-blue-500 transition-colors"
                              >
                                <Button variant={"link"} size={"sm"}>
                                  My Account
                                </Button>
                              </Link>
                            </li>
                            <li>
                              {user?.vendor?.vendor_status === "approved" && (
                                <Link
                                  href={"/vendor-dashboard/"}
                                  className="block hover:text-blue-500 transition-colors"
                                >
                                  <Button variant={"link"} size={"sm"}>
                                    Seller Dashboard
                                  </Button>
                                </Link>
                              )}
                            </li>
                          </>
                        ) : hasRole(user?.roles, "user") ? (
                          <>
                            <li>
                              <Link
                                href={`/dashboard/${user?.name}`}
                                className="block hover:text-blue-500 transition-colors"
                              >
                                <Button variant={"link"} size={"sm"}>
                                  My Account
                                </Button>
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="link" size="sm">
                                    Log In
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg_blur_effect">
                                  <Login_d />
                                </DialogContent>
                              </Dialog>
                            </li>
                            {/* <Login_d/> */}
                          </>
                        )}

                        {isLoading && <h1>Loading data...</h1>}
                        {user && (
                          <>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant={"link"} size={"sm"}>
                                  log out
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg_blur_effect">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will log
                                    out your system .
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => logout()}>
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                      </ul>
                    </div>
                  </>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-4 gap-1">
              <ModeToggle />
              <Button
                size={"icon"}
                variant={"outline"}
                className="relative"
                onClick={() => setWishlistOpen(true)}
              >
                <FaRegHeart className="text-xl" />
                {wishlist.length > 0 ? (
                  <Badge
                    variant={"destructive"}
                    className=" size-5 absolute -top-2 -right-1"
                  >
                    {wishlist.length}
                  </Badge>
                ) : (
                  ""
                )}
              </Button>

              <Button
                size={"icon"}
                variant={"outline"}
                className=" relative"
                onClick={() => setCartOpen(true)}
              >
                <FaCartShopping className=" text-xl" />
                {cartItemCount > 0 ? (
                  <Badge
                    variant={"destructive"}
                    className=" size-5 absolute -top-2 -right-1"
                  >
                    {cartItemCount}
                  </Badge>
                ) : (
                  ""
                )}
              </Button>
              {/* if mobile device show a hamburger icon */}
              <Button
                size={"icon"}
                variant={"outline"}
                className=" flex md:hidden cursor-pointer"
                onClick={() => setMenuOpen(true)}
              >
                <RiMenu2Fill
                  className={` ${!menuOpen
                    ? "rotate-y-180 duration-200"
                    : "rotate-0 duration-200"
                    }`}
                />
              </Button>
            </div>
          </div>

          {/* wishlist for Desktop device */}
          <div
            ref={wishlistRef}
            className={` w-full sm:w-[450px] ${!wishlistOpen
              ? "translate-x-[100%] duration-300"
              : `translate-x-0 duration-200 ${!isScrolled
                ? "top-0 bg_blur_effect border-l"
                : "  -top-[0%]  "
              }`
              } fixed h-screen right-0 top-0 z-50  px-5 py-10 border-l`}
          >
            <div className=" w-full flex items-center justify-end">
              <Button
                size={"icon"}
                variant={"outline"}
                onClick={() => setWishlistOpen(false)}
              >
                <BiX className="text-2xl" />
              </Button>
            </div>
            <div className="w-full h-full">
              <WishlistNew />
            </div>
            {isScrolled && (
              <div className="bg-white/95 dark:bg-black/95 -z-30  w-full h-screen absolute left-0 top-0"></div>
            )}
          </div>

          {/* cart for Desktop device */}
          <div
            ref={cartRef}
            className={` w-full sm:w-[450px] ${!cartOpen
              ? "translate-x-[100%] duration-300"
              : `translate-x-0 duration-200 border-l ${!isScrolled
                ? "top-0 bg_blur_effect"
                : "  -top-[0%] border-l  "
              }`
              } fixed h-screen right-0 top-0 z-50  px-5 py-10 border-l`}
          >
            <div className=" w-full flex items-center justify-end">
              <Button
                size={"icon"}
                variant={"outline"}
                onClick={() => setCartOpen(false)}
              >
                <BiX className="text-2xl " />
              </Button>
            </div>
            <div className="w-full h-full py-2 text-black">
              <CartListNew />
            </div>
            {isScrolled && (
              <div className="bg-white/95 dark:bg-black/95 -z-30  w-full h-screen absolute left-0 top-0"></div>
            )}
          </div>

          {/* mobile device navber  */}
          <div
            className={`  z-50  right-0  md:hidden fixed py-5 px-3 ${!menuOpen
              ? "-translate-x-[200%] duration-200 opacity-0"
              : `translate-x-0 duration-400 w-[100%] h-screen fixed ${!isScrolled ? "top-0" : "  -top-[0%] bg-black "
              }`
              }
                `}
          >
            <div className=" z-[9999] w-full  flex items-center justify-end">
              <Button
                size={"icon"}
                variant={"outline"}
                onClick={() => setMenuOpen(false)}
              >
                <BiX className="text-2xl " />
              </Button>
            </div>
            <div className=" py-4 flex items-center justify-end">
              <input
                type="search"
                placeholder="Search for products, categories or brands..."
                className=" w-full bg-slate-50 dark:bg-transparent xl:py-3 xl:px-5 py-2 px-4  text-slate-600 dark:text-slate-300 border-[0.5] border-gray-200 focus:outline-1 focus:outline-gray-400 duration-300 text-sm"
              />
              <button className=" border outline-none border-white py-2 px-4 hover:bg-white hover:text-black active:bg-white active:text-black duration-200">
                Search
              </button>
            </div>
            <div className=" -z-30 bg-white/60 dark:bg-white/5 backdrop-blur-lg w-full h-screen absolute left-0 top-0"></div>
          </div>
        </div>
      </div>
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:right-6 z-50 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <BiArrowToTop className="text-2xl" />
        </button>
      )}
    </>
  );
};

export default NavberM;
