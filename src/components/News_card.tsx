"use client";
import Image from "next/image";
import news1 from "@/../public/newes/newes1.png";
import { TbExternalLink } from "react-icons/tb";

const News_card = () => {
      return (
            <div className=" relative">
                  <div
                        className={`bg-blue-0 px-5 py-5 flex items-start justify-between flex-col cursor-pointer  bg-white z-20  shadow-sm hover:shadow-xl inset-shadow-2xs transition-shadow duration-300  ease-in-out`}
                  >
                        <Image className=" w-full" src={news1} alt="news" />
                        <div className=" mt-5 flex items-center justify-evenly gap-4 flex-col">
                              <p className=" text-center text-sm text-gray-600">
                                    If you’ve recently made a desktop PC or laptop purchase, you might
                                    want to consider adding peripherals to enhance your home office
                                    setup, your gaming rig, or your business workspace...
                              </p>
                              <span className="text-[#A2A6B0] text-xs">01.09.2020</span>
                              <div className=" w-full flex items-center justify-center gap-2 text-gray-500 hover:text-black duration-200 lowercase">
                                    <TbExternalLink />
                                    <p>see more</p>
                              </div>
                        </div>
                  </div>

            </div>
      );
};

export default News_card;
