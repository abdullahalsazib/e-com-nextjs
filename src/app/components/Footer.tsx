"use client";
import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { IoPricetags } from "react-icons/io5";
import { RiCustomerServiceFill } from "react-icons/ri";
import payment from "@/../public/payment.svg";
const footerLinks = [
  {
    title: "information",
    content: [
      { iTitle: "About", link: "/about" },
      { iTitle: "about zip", link: "/" },
      { iTitle: "privicy policy", link: "/" },
      { iTitle: "search", link: "/" },
      { iTitle: "terms", link: "/" },
      { iTitle: "orders and returns", link: "/" },
      { iTitle: "contact us", link: "/" },
      { iTitle: "advanced search", link: "/" },
      { iTitle: "newsletter subscription", link: "/" },
    ],
  },
  {
    title: "PC Parts",
    content: [
      { iTitle: "CPUS", link: "/" },
      { iTitle: "add on cards", link: "/" },
      { iTitle: "hard drives (internal)", link: "/" },
      { iTitle: "graphic cards", link: "/" },
      { iTitle: "keyboards / mice", link: "/" },
      { iTitle: "cases / power supplies / colling", link: "/" },
      { iTitle: "RAM (Memory)", link: "/" },
      { iTitle: "Software", link: "/" },
      { iTitle: "Motherboards", link: "/" },
    ],
  },
  {
    title: "Desktop PCs",
    content: [
      { iTitle: "Custome PCs", link: "/" },
      { iTitle: "Servers", link: "/" },
      { iTitle: "MSI All-in-One PCs", link: "/" },
      { iTitle: "HP/Compaq pCs", link: "/" },
      { iTitle: "ASUS PCs", link: "/" },
      { iTitle: "Tecs PCs", link: "/" },
    ],
  },
  {
    title: "Leptops",
    content: [
      { iTitle: "Everyday use notebooks", link: "/" },
      { iTitle: "MSI Workstation Serics", link: "/" },
      { iTitle: "MSI Prestige Serics", link: "/" },
      { iTitle: "Tablets and pads", link: "/" },
      { iTitle: "NotBooks", link: "/" },
      { iTitle: "Infinity Gaming NotBooks", link: "/" },
    ],
  },
  {
    title: "Address",
    content: [
      { iTitle: "Address: 1234 sateet Address City ", link: "/" },
      { iTitle: "Phone: (00) 1234 5678", link: "/" },
      { iTitle: "we are open: Monday-Thursday: 9:00 AM - 5:30 PM", link: "/" },
      { iTitle: "Friday: 9:00 AM - 6:00 PM", link: "/" },
      { iTitle: "Saturday: 11:00AM - 5:00 PM", link: "/" },
      { iTitle: "E-mail: shop.com@emai.com", link: "/" },
    ],
  },
];
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <div>
        <div className=" px-10 md:px-[10%]">
          <FooterTopCard />
        </div>
        <div className="pt-15 w-full flex items-start justify-between flex-col gap-2 bg-black text-white px-[10%]">
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
              <input
                type="text"
                placeholder="your email"
                className=" w-full py-3 px-5 border-2 border-gray-300 focus:border-white focus:outline-none rounded-sm"
              />
              <button className=" py-3 px-7 font-semibold text-sm capitalize rounded-full bg-blue-500 text-white hover:bg-white hover:text-blue-500 duration-200 transition-colors">
                Subscribe
              </button>
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
      <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full py-5 text-center">
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
      <div className="flex  items-center justify-center flex-col shadow-lg inset-shadow-sm py-10 px-3 md:px-5 gap-3">
        <div className=" bg-blue-500 rounded-full text-lg md:text-2xl text-white p-5">
          {icon}
        </div>
        <h2 className="text-black text-sm md:text-lg font-bold capitalize">
          {title}
        </h2>
        <p className="text-gray-600 text-sm font-light">{des}</p>
      </div>
    </>
  );
};
