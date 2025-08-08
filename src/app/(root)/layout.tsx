"use client";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navber";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className=" w-full bg-white dark:bg-black">{children}</main>
      <Footer />
    </>
  );
}
