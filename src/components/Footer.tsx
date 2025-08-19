"use client";
import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { IoPricetags } from "react-icons/io5";
import { RiCustomerServiceFill } from "react-icons/ri";
import payment from "@/../public/payment.svg";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { footerLinks } from "@/data/footerLink";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <div>
        <div className=" px-10 md:px-[10%] bg-white dark:bg-black">
          <FooterTopCard />
        </div>
        <div className="pt-15 w-full flex items-start justify-between flex-col gap-2 dark:bg-black dark:text-white bg-blue-50 text-black border-t px-[10%]">
          <div className=" flex items-center justify-center text-center md:text-left md:justify-between flex-col md:flex-row w-full">
            <div className=" w-full">
              <h1 className=" text-xl md:text-4xl font-bold capitalize ">
                Sign Up To Our Newsletter.
              </h1>
              <p className=" text-xs md:text-sm text-gray-500 pt-4">
                Be the first to hear about the latest offers.
              </p>
            </div>
            <div className=" flex items-center justify-center flex-col py-4 md:py-0  md:flex-row gap-4 w-full md:w-1/2">
              <div className="flex w-full max-w-sm items-center gap-2">
                <Input type="email" placeholder="Email" />
                <Button type="submit" variant="outline">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 w-full text-center lg:text-left pt-0 md:pt-5">
            {footerLinks.map((item, index) => (
              <div key={index}>
                <h2 className=" text-lg font-semibold capitalize pt-4">
                  {item.title}
                </h2>
                <ul className=" p-0 lg:pl-2">
                  {item.content.map((item2, index2) => (
                    <li key={index2}>
                      <a
                        className=" text-sm text-gray-400 hover:text-blue-400 duration-200 capitalize"
                        href={item2.link}
                      >
                        {item2.iTitle}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0 w-full text-white py-5 border-t-2 border-gray-600 mt-5">
            <div className=" text-lg flex items-center justify-center gap-2">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
            </div>
            <div>
              <Image src={payment} alt="payment" />
            </div>
            <div>
              <p className=" text-gray-300 text-sm font-semibold">
                Copyright © {year} Shop Pty. Ltd.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

const FooterTopCard = () => {
  return (
    <>
      <div className=" bg-white dark:bg-black grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full py-5 text-center">
        <FooterServicesCard
          icon={<RiCustomerServiceFill />}
          title="product support"
          des="Up to 3 years on-site warranty available for your peace of mind."
        />
        <FooterServicesCard
          icon={<FaUserCircle />}
          title="Personal Account"
          des="With big discounts, free delivery and a dedicated support specialist."
        />
        <FooterServicesCard
          icon={<IoPricetags />}
          title="Amazing Savings"
          des="Up to 70% off new Products, you can be sure of the best price."
        />
      </div>
    </>
  );
};
const FooterServicesCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  des: string;
}> = ({ icon, title, des }) => {
  return (
    <>
      <div className="flex bg-white rounded-md dark:bg-gradient-to-bl dark:hover:bg-gradient-to-br duration-500 from-slate-950 to-black border items-center justify-center flex-col shadow-lg inset-shadow-sm py-10 px-3 md:px-5 gap-3">
        <div className=" bg-blue-500 rounded-full text-lg md:text-2xl text-white p-5">
          {icon}
        </div>
        <h2 className="text-black dark:text-white text-sm md:text-lg font-bold capitalize">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-light">
          {des}
        </p>
      </div>
    </>
  );
};
