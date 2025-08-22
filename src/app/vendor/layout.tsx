import React from "react";
import NavberM from "@/components/Navber/NavberM";
import Footer from "@/components/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavberM />
      <main className=" w-full bg-white dark:bg-black">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
