import Image from "next/image";
import React from "react";

import image1 from "@/../public/hero-section/h2-bn-1.jpg";
import image2 from "@/../public/hero-section/h2-bn-2.jpg";
import image3 from "@/../public/hero-section/h2-bn-3.jpg";

const Hero_section = () => {
  return (
    <>
      <section
        id="hero-section"
        className="  flex items-center justify-center  gap-4 py-4 lg:px-[15%]"
      >
        <div className="  bg-yellow-500">
          <Image src={image1} alt="image1" />
        </div>
        <div className=" flex items-center justify-between flex-col gap-4">
          <div className="bg-blue-500">
            <Image src={image2} alt="image1" className=" w-auto" />
          </div>
          <div className="bg-red-500">
            <Image src={image3} alt="image1" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero_section;
