"use client";

import NavberM from "@/components/Navber/NavberM";
import Footer from "../../components/Footer";
// import Navbar from "../../components/Navber";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Navbar /> */}
      <NavberM />
      <main className=" w-full bg-white dark:bg-black">{children}</main>
      <Footer />
    </>
  );
}
