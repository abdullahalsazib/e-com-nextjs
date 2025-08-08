import Image from "next/image";
import React from "react";

import image1 from "@/../public/hero-section/h2-bn-1.jpg";
import image2 from "@/../public/hero-section/h2-bn-2.jpg";
import image3 from "@/../public/hero-section/h2-bn-3.jpg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const Hero_section = () => {
  return (
    <>
      <section
        id="hero-section"
        className=" bg-white dark:bg-gray-950 flex items-center justify-center flex-col lg:flex-row  gap-4 lg:py-20 py-10 lg:px-[15%] px-10"
      >
        <Home_card_component_Big image={image1} />
        <div className=" flex items-center justify-between lg:flex-col md:flex-row flex-col gap-4">
          <Home_card_component_Small image={image2} />
          <Home_card_component_Small image={image3} />
        </div>
      </section>
    </>
  );
};

export default Hero_section;

const Home_card_component_Big = ({ image }: { image: StaticImport }) => {
  return (
    <>
      <div className=" border relative hero_card overflow-hidden group rounded-md cursor-pointer">
        <Image
          src={image}
          alt="image"
          className=" rounded-md duration-150 group-hover:scale-105"
        />
        <div className=" w-full absolute top-0 left-0 bg-transparent rounded-lg px-10 py-10">
          <div className="space-y-5">
            <p className={` uppercase text-yellow-500 font-semibold `}>
              Digital Cable TV
            </p>
            <h1
              className={` text-white text-5xl font-normal tracking-wider capitalize w-1/2 `}
            >
              Entertainment For your Family
            </h1>
            <h3 className=" text-lg">
              From <span className=" text-white font-bold"> $488</span>
            </h3>
            <button className=" text-lg uppercase text-white bg-green-600 py-2 px-4 font-semibold rounded-md">
              Shop now
            </button>
          </div>
        </div>

        <div className=" w-full h-full bg-[#00000070] absolute top-0 left-0 duration-1000 ease-initial ease-in-out opacity-30 hover:opacity-45 -translate-140 group-hover:translate-0 "></div>
        <div className=" w-full h-full bg-[#0000008d] absolute top-0 left-0 duration-1000 ease-initial  opacity-30 hover:opacity-45 translate-140 group-hover:translate-0 "></div>
      </div>
    </>
  );
};

const Home_card_component_Small = ({ image }: { image: StaticImport }) => {
  return (
    <>
      <div className=" border relative hero_card overflow-hidden group rounded-md cursor-pointer">
        <Image
          src={image}
          alt="image"
          className=" rounded-md duration-150 group-hover:scale-105"
        />
        <div className=" w-full absolute top-0 left-0 bg-transparent rounded-lg px-5 py-5">
          <div className="space-y-2">
            <h1
              className={` text-black text-2xl font-semibold tracking-wider capitalize w-1/2`}
            >
              Entertainment For your Family
            </h1>

            <a
              href="#"
              className=" text-xl underline underline-offset-4 text-black -z-50 "
            >
              Shop now
            </a>
          </div>
        </div>

        <div className=" w-full h-full bg-[#00000070] absolute top-0 left-0 duration-1000 ease-initial ease-in-out opacity-30 hover:opacity-45 -translate-140 group-hover:translate-0 "></div>
        <div className=" w-full h-full bg-[#0000008d] absolute top-0 left-0 duration-1000 ease-initial  opacity-30 hover:opacity-45 translate-140 group-hover:translate-0 "></div>
      </div>
    </>
  );
};
