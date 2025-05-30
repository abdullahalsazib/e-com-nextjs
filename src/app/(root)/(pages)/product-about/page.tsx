"use client";
import Tabs from "@/app/components/smallComponent/Tab";
import Image from "next/image";
import styles from "./product.module.css";
// import icons
import { FaRegHeart } from "react-icons/fa6";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { VscMail } from "react-icons/vsc";

//image import
import paypal from "@/../public/paypal.svg";
import product1 from "@/../public/product-image/image2.png";
import zipTextLogo from "@/../public/ZipTextLogo.svg";
import banner from "@/../public/images/Rectangle-11.png";
import serviceWomen from "@/../public/images/serviceWomen.svg";
import { IoArrowForwardSharp } from "react-icons/io5";

// feature
import f1 from "@/../public/fetuer/intel.png";
import f2 from "@/../public/fetuer/rtx.png";
import f3 from "@/../public/fetuer/gen3.png";
import f4 from "@/../public/fetuer/ddr4.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useState } from "react";
import Breadcrumb from "@/app/components/smallComponent/Breadcrumb";

const featureCardData = [
  {
    image: f1,
    desc: "Intel® Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience",
  },
  {
    image: f2,
    desc: "Intel® Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience",
  },
  {
    image: f3,
    desc: "Intel® Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience",
  },
  {
    image: f4,
    desc: "Intel® Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience",
  },
];

const tab = [
  { title: "About Product" },
  { title: "Details" },
  { title: "Specs" },
];
const serviceTab = [
  { title: "Product Support" },
  { title: "FAQ" },
  { title: "Our Buyer Guide" },
];
const breadcrumbItems = [
  { label: "Home" },
  { label: "Products" },
  { label: "MSI WS Series", active: true },
];

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-white">
      {/* Product Header Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between py-4 px-4 md:px-6 lg:px-[10%] border-b border-gray-300">
        <div className="w-full lg:w-auto mb-4 lg:mb-0">
          <Tabs
            tab={tab}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 w-full lg:w-auto">
          <p className="font-light text-gray-600 whitespace-nowrap">
            On Sale from{" "}
            <span className="font-semibold text-gray-800">$3,299.00</span>
          </p>

          <div className="flex flex-row items-center justify-between gap-3 w-full sm:w-auto">
            <input
              type="number"
              placeholder="00"
              className="w-[200px] duration-200 bg-slate-100 focus:outline-slate-300 py-2 px-4"
            />

            {/* <div className="flex items-center  bg-red-400 md:justify-center gap-2 text-sm w-full sm:w-auto"> */}
              <button className="py-2 px-4 sm:px-6 rounded-full bg-blue-500 hover:bg-blue-600 duration-200 cursor-pointer font-semibold text-white capitalize whitespace-nowrap">
                add to cart  
              </button>
             {/*  <button className="py-3 px-4 sm:px-7 rounded-full bg-[#FFB800] hover:bg-[#ffd877] duration-200 cursor-pointer font-semibold text-white capitalize">
                <Image
                  src={paypal}
                  className="w-full max-w-[60px]"
                  alt="paypal"
                />
              </button> */}
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* Main Product Content */}
      <div className="w-full bg-[#F5F7FF] px-4 md:px-6 lg:px-[10%] flex flex-col lg:flex-row items-center justify-center">
        {/* Product Info Section */}
        <div className="w-full lg:w-1/2 h-full py-6 lg:py-0 flex items-center justify-center lg:justify-end">
          <div className="w-full lg:w-[80%] px-0 lg:px-4 flex flex-col items-start">
            <Breadcrumb items={breadcrumbItems} />

            <div className="w-full">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold capitalize py-3 lg:py-5">
                MSI MPG Trident 3
              </h1>
              <a
                href="#"
                className="text-blue-500 text-xs underline py-3 lg:py-5 underline-offset-1 hover:text-blue-700 duration-200"
              >
                Be the first to review this product
              </a>
            </div>

            <div className="w-full py-4">
              {activeIndex === 0 && <About_Product />}
              {activeIndex === 1 && <Product_Details />}
              {activeIndex === 2 && <SpecTable />}
            </div>

            <div className="mt-10 lg:mt-20 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="font-bold">
                Have a Question?{" "}
                <a href="#" className="text-blue-500">
                  Contact Us
                </a>
              </p>
              <p className="text-gray-600 uppercase">SKU D5515AI</p>
            </div>
          </div>
        </div>

        {/* Product Image Section */}
        <div className="w-full lg:w-1/2 py-6 lg:py-20 bg-white">
          <div className="flex items-start justify-center lg:justify-start">
            <div className="px-3 py-3 w-full lg:w-[80%] relative">
              <div className="absolute top-0 left-0 px-3 py-2 flex items-center justify-center flex-col gap-2">
                <IconBtn Icon={<FaRegHeart />} />
                <IconBtn
                  Icon={<HiOutlineBars3BottomRight className="rotate-90" />}
                />
                <IconBtn Icon={<VscMail />} />
              </div>
              <Image
                src={product1}
                alt="product image"
                className="m-auto w-[50%] max-w-md"
                priority
              />
            </div>
          </div>
          <div className="px-6 lg:px-10 py-6 lg:py-10">
            <Image
              src={zipTextLogo}
              alt="zip brand"
              className="w-full max-w-xs"
            />
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="w-full px-4 md:px-6 lg:px-[10%] py-10 flex flex-col lg:flex-row items-center justify-center bg-[#010101] relative">
        <div className="w-full lg:w-1/2 flex items-start px-0 lg:px-10 justify-center gap-6 lg:gap-10 flex-col order-2 lg:order-1 mt-6 lg:mt-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            Outplay the Competition
          </h1>
          <p className="font-light text-white text-base lg:text-lg">
            Experience a 40% boost in computing from last generation. MSI
            Desktop equips the 10th Gen. Intel® Core™ i7 processor with the
            upmost computing power to bring you an unparalleled gaming
            experience. <br />
            <br /> *Performance compared to i7-9700. Specs varies by model.
          </p>
        </div>
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          <Image className="w-full" src={banner} alt="banner" priority />
        </div>
        <div className="absolute left-4 lg:left-10 bottom-4 lg:bottom-20 py-2 px-4 lg:px-[10%] flex items-center justify-center gap-3">
          <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
        </div>
      </div>

      {/* Service Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 px-4 md:px-6 lg:px-[10%] py-10">
        <div className="w-full lg:w-1/2">
          <ul className="flex flex-col gap-3">
            {serviceTab.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer flex items-center justify-between bg-[#F5F7FF] gap-4 lg:gap-20 rounded-md px-4 lg:px-5 py-3 border-2 border-gray-100 w-full"
              >
                <p className="text-base lg:text-lg font-semibold text-black">
                  {item.title}
                </p>
                <IoArrowForwardSharp className="text-sm text-blue-500" />
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-1/2">
          <Image
            src={serviceWomen}
            alt="service women"
            className="w-full max-w-lg mx-auto"
          />
        </div>
      </div>

      {/* Features Section */}
      <div
        className={`px-4 md:px-6 lg:px-[10%] py-10 lg:py-14 flex items-center justify-center flex-col ${styles.featuerBox}`}
      >
        <div className="w-full flex items-center justify-center text-center flex-col gap-4 lg:gap-6">
          <h1 className="text-3xl lg:text-4xl font-semibold text-white">
            Features
          </h1>
          <p className="text-sm text-white w-full lg:w-[70%] xl:w-[50%]">
            The MPG series brings out the best in gamers by allowing full
            expression in color with advanced RGB lighting control and
            synchronization.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 py-8 lg:py-14 w-full">
          {featureCardData.map((item, index) => (
            <FeatureCard key={index} image={item.image} des={item.desc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

const IconBtn: React.FC<{
  Icon: React.ReactNode;
  className?: string;
}> = ({ className, Icon }) => {
  return (
    <button
      className={`p-1 text-lg text-gray-500 border-2 border-slate-400 rounded-full ${className} hover:text-gray-800 duration-300 hover:border-gray-800 font-bold`}
    >
      {Icon}
    </button>
  );
};

const FeatureCard: React.FC<{
  image: string | StaticImport;
  des: string;
}> = ({ image, des }) => {
  return (
    <div className="py-3 px-4 lg:px-5 w-full flex items-center justify-center flex-col gap-4 lg:gap-6 border border-gray-800">
      <div className="bg-black p-3 rounded-full w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] flex items-center justify-center">
        <Image className="p-2 lg:p-3 w-full" src={image} alt="feature" />
      </div>
      <p className="text-white text-xs lg:text-sm text-center">{des}</p>
    </div>
  );
};

const About_Product = () => {
  return (
    <p className="text-lg lg:text-xl text-justify font-light uppercase mt-3 lg:mt-5 pr-0 lg:pr-5">
      MSI MPG Trident 3 10SC-005AU Intel i7 10700F, 2060 SUPER, 16GB RAM, 512GB
      SSD, 2TB HDD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty
      Gaming Desktop
    </p>
  );
};

const specs = [
  { key: "CPU", value: "Intel Core i7-10700F" },
  { key: "Motherboard", value: "Intel H410" },
  { key: "Color", value: "WHITE" },
  { key: "GPU", value: "NVIDIA MSI GeForce RTX 2060 SUPER 8GB AERO ITX GDDR6" },
  { key: "RAM", value: "SO-DIMM 16GB (16GB x 1) DDR4 2666MHz" },
  { key: "RAM Slots", value: "2 total slots (64GB Max)" },
  { key: "SSD", value: "512GB (1 x 512GB) M.2 NVMe PCIe GEN3x4" },
  { key: "HDD", value: "2TB (2.5) 5400RPM" },
  { key: "Accessories", value: "Gaming Keyboard GK30 + Gaming Mouse GM11" },
  { key: "Drive Bays", value: "3.5 HDD (0/0), 2.5 HDD/SSD(1/0), M.2 (1/0)" },
  { key: "Ethernet", value: "Intel WGI219Vethernet (10/100/1000M)" },
  { key: "Wireless", value: "AX200 (WIFI 6)+BT5.1" },
  { key: "Power Supply", value: "PSU 330W" },
  { key: "Cooling", value: "Fan Cooler" },
];

const Product_Details = () => {
  return (
    <ul className="list-disc pl-6 space-y-1 text-sm lg:text-base">
      {specs.map((item, index) => (
        <li key={index}>
          <strong>{item.key}:</strong> {item.value}
        </li>
      ))}
    </ul>
  );
};

const specs2 = [
  { label: "CPU", value: "N/A" },
  { label: "Featured", value: "N/A" },
  { label: "I/O Ports", value: "N/A" },
];

const SpecTable = () => {
  return (
    <div className="border border-gray-300 w-full max-w-md text-sm lg:text-base">
      {specs2.map((item, index) => (
        <div
          key={index}
          className={`flex justify-between px-4 py-3 ${
            index % 2 === 1 ? "bg-blue-50" : "bg-white"
          }`}
        >
          <span className="font-medium text-black">{item.label}</span>
          <span className="text-gray-500">{item.value}</span>
        </div>
      ))}
    </div>
  );
};
