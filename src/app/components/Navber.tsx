"use client";
import React, { useState, useEffect, useRef } from "react";
import Topbar from "./Topbar/Topbar";
import { BsBoxSeamFill } from "react-icons/bs";
import { BiSearch, BiArrowToTop, BiTrash } from "react-icons/bi";
import { FaUserCircle, FaBars, FaCcPaypal } from "react-icons/fa";
import { PiX } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  accountNavagationLink,
  NavLink as navLink,
} from "../data/navegationLinks";
import { Item, NestedItem, SubItem } from "../type/type";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import WishlistDropdown from "./WishlistDropdown";
import { useWishlist } from "../context/WishlistContext";
import CartListDropdown from "./CartListDropdown";

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

  const dropdownRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { wishlist } = useWishlist();

  // useAuth
  const { user, isLoading, logout } = useAuth();
  // console.log(user);
  const handleLogout = () => {
    logout();
  };
  const handleRolteSell = () => {
    toast.loading("Wait please");
    router.push("/seller-login");
    setTimeout(() => {
      toast.dismiss();
    }, 1000);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close account dropdown if clicked outside
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsAccountDropdownOpen(false);
      }

      // Close cart if clicked outside
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }

      // Close mobile menu if clicked outside
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".mobile-menu-toggle")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
          (i) => i !== childIndex,
        ),
      }));
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsMobileMenuOpen(false);
    setIsAccountDropdownOpen(false);
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsAccountDropdownOpen(false);
    setIsCartOpen(false);
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
          <div className="flex items-center justify-between w-full relative md:gap-10">
            <div className="flex items-center">
              <Link href="/">
                <BsBoxSeamFill className="text-3xl md:text-5xl text-blue-600" />
              </Link>
            </div>

            {/* Desktop nav-links */}
            {!isDesktopSearch ? (
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
                        className="text-sm font-semibold text-black hover:text-blue-500 duration-300 transition-colors cursor-pointer py-2"
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
                        <h1 className="text-sm font-semibold text-black hover:text-blue-500 duration-300 transition-colors cursor-pointer py-2">
                          {item.title}
                        </h1>
                      </Link>
                    )}

                    {/* Dropdown content */}
                    {item.dropDown && activeDropdowns.includes(index) && (
                      <div className="absolute -right-20 top-full mt-0 w-56 bg-white shadow-lg rounded-b-md z-50 border-t-2 border-blue-500">
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
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                            >
                              {subItem.title}
                            </a>
                            {subItem.nested &&
                              activeNestedDropdowns[index]?.includes(
                                subIndex,
                              ) && (
                                <div className="absolute left-full top-0 ml-0 w-56 bg-white shadow-lg rounded-r-md z-50 border-l-2 border-blue-500">
                                  {subItem.nested.map(
                                    (
                                      nestedItem: NestedItem,
                                      nestedIndex: number,
                                    ) => (
                                      <a
                                        key={nestedIndex}
                                        href={nestedItem.link}
                                        className="block px-4 py-2 text-sm text-gray-500 hover:text-blue-500 hover:bg-gray-50"
                                      >
                                        {nestedItem.title}
                                      </a>
                                    ),
                                  )}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
                {user?.role !== "admin" && (
                  <button
                    onClick={handleRolteSell}
                    className=" py-2 px-4 rounded-lg text-sm font-semibold capitalize text-white bg-blue-500 hover:bg-blue-600 duration-200"
                  >
                    Seller Page
                  </button>
                )}
              </ul>
            ) : (
              <>
                <div className="relative w-full self-center px-5">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Search in here.."
                      className="w-full py-2 px-5 border-2 border-gray-300 rounded-lg focus:outline-1 focus:outline-sky-200 focus:bg-slate-100"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Desktop right section */}
          <div className="hidden lg:flex items-center justify-center gap-3 relative pr-0 md:px-10">
            <button
              className="text-2xl font-bold"
              onClick={() => setIsDesktopSearch(!isDesktopSearch)}
            >
              {!isDesktopSearch ? <BiSearch /> : <CgClose />}
            </button>
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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleAccountDropdown}
                className="text-3xl font-bold hover:text-blue-500 transition-colors"
                aria-label="User account"
                aria-expanded={isAccountDropdownOpen}
              >
                <FaUserCircle />
              </button>

              {isAccountDropdownOpen && (
                <div className="absolute top-12 right-0 z-50 w-64 bg-white rounded-md shadow-lg border border-gray-200">
                  <div className="p-4">
                    <ul className="space-y-3 text-sm text-gray-700">
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
                              My Wish List {`(${wishlist.length})`}
                            </Link>
                          </li>
                        </>
                      )}

                      {/* add for commit */}
                      {/* add for commit */}
                      {/* add for commit */}
                      {/* add for commit */}
                      {/* add for commit */}
                      {/* add for commit */}
                      {/* add for commit */}
                      {/* <li> */}
                      {/*   <a */}
                      {/*     href="#" */}
                      {/*     className="block hover:text-blue-500 transition-colors" */}
                      {/*   > */}
                      {/*     Compare {`(0)`}{" "} */}
                      {/*   </a> */}
                      {/* </li> */}
                      {isLoading && <h1>Loading data...</h1>}
                      {!user ? (
                        <>
                          {" "}
                          <li className="border-t border-gray-200 pt-3">
                            <Link
                              href="/register"
                              className="block hover:text-blue-500 transition-colors"
                            >
                              Create an Account
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/login"
                              className="block hover:text-blue-500 transition-colors"
                            >
                              Sign In
                            </Link>
                          </li>{" "}
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
                </div>
              )}
            </div>
          </div>

          {/* Mobile right section */}
          <div className="flex lg:hidden items-center justify-center gap-4">
            <button
              className="text-xl font-bold"
              onClick={() => setIsDesktopSearch(!isDesktopSearch)}
            >
              {!isDesktopSearch ? <BiSearch /> : <CgClose />}
            </button>
            {/* <button className="text-xl font-bold" onClick={toggleCart}> */}
            {/*   <LuShoppingCart /> */}
            {/* </button> */}

            <CartListDropdown />
            <WishlistDropdown />
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
          <div className="lg:hidden bg-white shadow-lg" ref={mobileMenuRef}>
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

        {/* Mobile Cart Drawer */}
        {isCartOpen && isMobile && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
            <div
              className="w-full max-w-md bg-white h-full overflow-y-auto"
              ref={cartRef}
            >
              <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-lg font-bold">My Cart</h2>
                <button onClick={toggleCart}>
                  <CgClose className="text-xl" />
                </button>
              </div>
              <div className="p-4">
                <SmallCart />
                <SmallCart />
              </div>
              <div className="p-4 border-t">
                <h3 className="text-lg font-bold text-center">
                  Subtotal: <span className="text-black">$30000</span>
                </h3>
                <div className="mt-4 space-y-2">
                  <button className="w-full py-3 rounded-full text-sm bg-blue-500 text-white">
                    Go to Checkout
                  </button>
                  <button className="w-full py-3 rounded-full text-sm bg-yelllow-500 text-white flex items-center justify-center gap-2">
                    Checkout with <FaCcPaypal className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
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
    <h4 key={index} className="w-full py-3 border-b border-gray-200 capitalize">
      <div
        className="flex justify-between items-center text-sm font-semibold text-black hover:text-blue-500 duration-300 transition-colors cursor-pointer"
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
              <a
                href={subItem.link}
                className="block py-2 text-sm text-gray-600 hover:text-blue-500"
              >
                {subItem.title}
              </a>

              {/* Second level nested dropdown */}
              {subItem.nested && (
                <div className="pl-4">
                  {subItem.nested.map(
                    (nestedItem: NestedItem, nestedIndex: number) => (
                      <a
                        key={nestedIndex}
                        href={nestedItem.link}
                        className="block py-2 text-sm text-gray-500 hover:text-blue-500"
                      >
                        {nestedItem.title}
                      </a>
                    ),
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

const SmallCart = () => {
  return (
    <>
      <div className="py-3 px-3 w-full flex items-center justify-between gap-4 border-y border-gray-200">
        <h3 className="text-xs font-semibold text-black text-nowrap">
          <span className="text-xl font-bold">1</span> X
        </h3>
        <div className="px-0 py-0 w-10 h-10 bg-gray-200 rounded"></div>
        <h3 className="text-xs font-light">
          EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
        </h3>
        <div className="text-xs flex items-start justify-end gap-1 flex-col">
          <div className="p-1 border border-gray-400 rounded-full">
            <CgClose className="text-gray-400" />
          </div>
          <div className="p-1 border border-gray-400 rounded-full">
            <BiTrash className="text-gray-400" />
          </div>
        </div>
      </div>
    </>
  );
};
