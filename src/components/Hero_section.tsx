import Image from "next/image";
import React from "react";

import image1 from "@/../public/hero-section/h2-bn-1.jpg";
import image2 from "@/../public/hero-section/h2-bn-2.jpg";
import image3 from "@/../public/hero-section/h2-bn-3.jpg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Button } from "./ui/button";

const Hero_section = () => {
  return (
    <section
      id="hero-section"
      className="bg-white dark:bg-gray-950 flex flex-col lg:flex-row items-center justify-center gap-4 py-10 lg:py-20 px-4 sm:px-8 lg:px-[10%]"
    >
      <Home_card_component_Big image={image1} />
      <div className="flex flex-col md:flex-row lg:flex-col gap-4 w-full lg:w-auto">
        <Home_card_component_Small image={image2} />
        <Home_card_component_Small image={image3} />
      </div>
    </section>
  );
};

export default Hero_section;

const Home_card_component_Big = ({ image }: { image: StaticImport }) => {
  return (
    <div className=" z-10 relative overflow-hidden group cursor-pointer w-full lg:w-auto">
      <Image
        src={image}
        alt="image"
        className="w-full h-auto object-cover duration-150 group-hover:scale-105"
        priority
      />
      <div className="absolute bg-transparent px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 flex flex-col justify-center space-y-4">
        <p className="uppercase text-yellow-500 font-semibold text-sm sm:text-base">
          Digital Cable TV
        </p>
        <h1 className="text-white text-2xl sm:text-3xl lg:text-5xl font-normal tracking-wider capitalize max-w-[80%]">
          Entertainment For your Family
        </h1>
        <h3 className="text-base sm:text-lg">
          From <span className="text-white font-bold">$488</span>
        </h3>
        <div>
          <Button
            size={"lg"}
            className="bg-yellow-500 text-black hover:bg-yellow-600"
          >
            Shop now
          </Button>
        </div>
      </div>
      {/* <div className="absolute inset-0 bg-black/70 duration-1000 opacity-30 group-hover:opacity-45"></div> */}
    </div>
  );
};

const Home_card_component_Small = ({ image }: { image: StaticImport }) => {
  return (
    <div className=" z-10 border relative overflow-hidden group  cursor-pointer w-full lg:w-auto">
      <Image
        src={image}
        alt="image"
        className=" w-full h-auto object-cover duration-150 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-transparent  px-4 py-4 sm:px-5 sm:py-5 flex flex-col justify-center space-y-2">
        <h1 className="text-black text-lg sm:text-2xl font-semibold tracking-wider capitalize max-w-[80%]">
          Entertainment For your Family
        </h1>
        <a
          href="#"
          className="text-base sm:text-xl underline underline-offset-4 text-black"
        >
          Shop now
        </a>
      </div>
      <div className="absolute inset-0 bg-black/70 duration-1000 opacity-30 group-hover:opacity-45"></div>
    </div>
  );
};
