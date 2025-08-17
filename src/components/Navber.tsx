"use client";
import { useState, useEffect } from "react";
import { BsBoxSeamFill } from "react-icons/bs";
import { BiArrowToTop } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavLink as navLink } from "../app/data/navegationLinks";
import { NestedItem } from "../app/type/type";
import { useAuth } from "../app/context/AuthContext";
import WishlistDropdown from "./WishlistDropdown";
import { useWishlist } from "../app/context/WishlistContext";
import CartListDropdown from "./CartListDropdown";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { FaBasketShopping } from "react-icons/fa6";
import { ModeToggle } from "./Theme_Button";
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
} from "./ui/alert-dialog";
import hasRole from "@/lib/role-extr";
import Topbar from "./Topbar/Topbar";
import { FloatingDock } from "./ui/floating-dock";

const dockItem = [
  { title: "home", icon: <BsBoxSeamFill />, href: "/" },
  {
    title: "cart",
    icon: <FaBasketShopping />,
    href: "/shoping-card",
  },
  {
    title: "wishlist",
    icon: <FaRegUserCircle />,
    href: "/wishlist",
  },
  {
    title: "account",
    icon: <FaRegUserCircle />,
    href: "/user-account",
  },
];

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [activeDropdowns, setActiveDropdowns] = useState<number[]>([]);
  const [activeNestedDropdowns, setActiveNestedDropdowns] = useState<{
    [key: string]: number[];
  }>({});
  const [isMobile, setIsMobile] = useState(false);
  const { wishlist } = useWishlist();

  // useAuth
  const { user, isLoading, logout } = useAuth();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  

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

  return (
    <>
      <div
        className={`w-full  ${
          isScrolled ? "fixed top-0 left-0 z-50 shadow-md" : ""
        }`}
      >
        <div className="">
          <Topbar />
        </div>

        <div className=" fixed md:hidden right-5 bottom-4 z-50">
          <FloatingDock items={dockItem} />
        </div>

        <nav className=" border-b dark:bg-black dark:text-white bg-white md:py-5 md:px-4 py-3 px-3 lg:px-5 xl:px-[10%] flex items-center justify-between">
          <div className="flex items-center justify-start w-full relative md:gap-10">
            <div className="flex items-center">
              <Link
                href="/"
                className=" flex items-center justify-center gap-2"
              >
                <BsBoxSeamFill className="text-2xl md:text-3xl text-blue-600" />
                <h1 className=" font-bold hidden md:block ">E_shop</h1>
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
          <div className=" flex items-center justify-between gap-1 lg:gap-3 relative ">
            <ModeToggle />
            {/* cart */}
            {/* wishlist */}
            {user?.roles ? (
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
                        {hasRole(user?.roles, "superadmin") ? (
                          <>
                            <li>
                              <Link
                                href={`/user-account/${user?.name}`}
                                className="block hover:text-blue-500 transition-colors"
                              >
                                <Button
                                  variant={"secondary"}
                                  className=" w-full"
                                  size={"sm"}
                                >
                                  My Account
                                </Button>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/super-admin"
                                className="block hover:text-blue-500 transition-colors"
                              >
                                <Button
                                  variant={"secondary"}
                                  className=" w-full"
                                  size={"sm"}
                                >
                                  Super admin
                                </Button>
                              </Link>
                            </li>
                          </>
                        ) : hasRole(user?.roles, "admin") ? (
                          <>
                            <li>
                              <Link
                                href={`/user-account/${user?.name}`}
                                className="block hover:text-blue-500 transition-colors"
                              >
                                <Button
                                  variant={"secondary"}
                                  className=" w-full"
                                  size={"sm"}
                                >
                                  My Account
                                </Button>
                              </Link>
                            </li>
                            <li>
                              {user?.vendor?.vendor_status === "approved" && (
                                <Link
                                  href={"/vendor/seller-dashboard"}
                                  className="block hover:text-blue-500 transition-colors"
                                >
                                  <Button
                                    variant={"secondary"}
                                    className=" w-full"
                                    size={"sm"}
                                  >
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
                                href={`/user-account/${user?.name}`}
                                className="block hover:text-blue-500 transition-colors"
                              >
                                <Button
                                  variant={"secondary"}
                                  className=" w-full"
                                  size={"sm"}
                                >
                                  My Account
                                </Button>
                              </Link>
                            </li>

                            <li>
                              <Link
                                className="block hover:text-blue-500 transition-colors"
                                href={"/shoping-card"}
                              >
                                <Button
                                  variant={"secondary"}
                                  className=" w-full"
                                  size={"sm"}
                                >
                                  My Wish List {`(${wishlist.length})`}
                                </Button>
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
                        {user && (
                          <>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant={"secondary"}
                                  size={"default"}
                                  className="size-8 w-full"
                                >
                                  log out
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
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
          </div>
        </nav>

        {/* Mobile device nav-bar */}
        {/* <nav className=" w-full py-3 px-10 bg-yellow-400">

        </nav> */}
      </div>

      {/* Scroll to top button */}
    

      {/* Add padding to content when navbar is fixed */}
      {isScrolled && <div className="h-[110px] md:h-[120px]"></div>}
    </>
  );
}
