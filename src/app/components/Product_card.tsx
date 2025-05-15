"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import product1 from "@/../public/product-image/image-1.png";
import { FaCartArrowDown, FaRegHeart, FaStar } from "react-icons/fa6";

const Product_card = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <>
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={`bg-blue-0 px-5 py-5 flex items-start justify-between flex-col cursor-pointer  duration-200 transition-transform transform  hover:scale-105 bg-white relative z-20 ${
          isHover ? "shadow-lg inset-shadow-sm" : "shadow-none"
        }`}
      >
        <p className="text-xs text-green-700 flex items-center justify-center gap-2">
          <IoCheckmarkCircle />
          in stock
        </p>
        <div className=" w-full flex items-center justify-center">
          <Image src={product1} alt={"product1"} />
        </div>
        <div className="flex items-start justify-center flex-col space-y-5 w-full">
          <div className="flex items-center justify-center">
            <FaStar className="text-[#E9A426]" />
            <FaStar className="text-[#E9A426]" />
            <FaStar className="text-[#E9A426]" />
            <FaStar className="text-[#E9A426]" />
            <FaStar className="text-[#CACDD8]" />
            <div className=" px-3">
              <p className="text-xs text-gray-400">Reviews {`(4)`}</p>
            </div>
          </div>

          <p className=" text-sm font-light py-2 text-justify pr-4 text-gray-600">
            <span className="text-black font-bold"> EX DISPLAY</span> : MSI Pro
            16 Flex-036AU 15.6 MULTITOUCH All-In-On...
          </p>
          <div className=" flex items-start justify-start flex-col">
            <del className=" font-light text-sm text-gray-500">$599.00</del>
            <h3 className="text-lg text-black font-bold">$499.00</h3>
          </div>
        </div>

        <div
          className={` left-0 bottom-0 w-full bg-gradient-to-br to-indigo-50 gap-1 px-5 flex-col from-transparent pt-2 pb-2 flex items-center justify-center ${
            isHover ? "flex absolute top-15 left-0 " : "hidden"
          }`}
        >
          <button className="  text-sm duration-300 font-semibold border-2 bg-blue-500 text-white border-blue-100 rounded-full hover:text-white hover:bg-blue-700 py-2 px-4 active:scale-105 capitalize flex items-center justify-center gap-3">
            <FaRegHeart />
            <p className="text-xs"> add to wishlist</p>
          </button>

          <button className=" text-sm duration-300 font-semibold border-2 bg-blue-500 text-white border-blue-100 rounded-full hover:text-white hover:bg-blue-700 py-2 px-4 active:scale-105 capitalize flex items-center justify-center gap-3">
            <FaCartArrowDown />
            <p className="text-xs"> add to cart</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Product_card;
