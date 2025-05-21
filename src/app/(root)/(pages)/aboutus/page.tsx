import Breadcrumb from "@/app/components/smallComponent/Breadcrumb";
import React from "react";
import about from "@/../public/about.png";
import about2 from "@/../public/about2.png";
import about3 from "@/../public/about3.png";
import about4 from "@/../public/about4.png";
import about5 from "@/../public/about5.png";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const breadcrumb = [{ label: "Home" }, { label: "About us", active: true }];

// Reusable Section Component
const AboutSection: React.FC<{
  bgColor: string;
  title: string;
  content: string;
  image: string | StaticImport;
  imageClass?: string;
  reverse?: boolean;
}> = ({ bgColor, title, content, image, imageClass = "", reverse = false }) => {
  return (
    <div className={`py-10 md:py-20 ${bgColor}`}>
      <div
        className={`container mx-auto px-4 md:px-10 flex flex-col ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } items-center justify-evenly gap-8 md:gap-10`}
      >
        <div className="w-full md:w-1/2 lg:w-[500px] flex flex-col gap-6 md:gap-10">
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl font-bold ${
              bgColor === "bg-black" ? "text-white" : "text-black"
            }`}
          >
            {title}
          </h1>
          <p
            className={`text-base md:text-lg ${
              bgColor === "bg-black" ? "text-white" : "text-black"
            } font-normal`}
          >
            {content}
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={image}
            alt="about section"
            className={`w-full max-w-md ${imageClass}`}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default function AboutUs() {
  const sections = [
    {
      bgColor: "bg-black",
      title: "A Family That Keeps On Growing",
      content:
        "We always aim to please the home market, supplying great computers and hardware at great prices to non-corporate customers, through our large Melbourne CBD showroom and our online store.\n\nShop management approach fosters a strong customer service focus in our staff. We prefer to cultivate long-term client relationships rather than achieve quick sales, demonstrated in the measure of our long-term success.",
      image: about,
    },
    {
      bgColor: "bg-white",
      title: "Our Commitment to Quality",
      content:
        "We always aim to please the home market, supplying great computers and hardware at great prices to non-corporate customers, through our large Melbourne CBD showroom and our online store.\n\nShop management approach fosters a strong customer service focus in our staff. We prefer to cultivate long-term client relationships rather than achieve quick sales, demonstrated in the measure of our long-term success.",
      image: about2,
      imageClass: "w-[90%]",
      reverse: true,
    },
    {
      bgColor: "bg-black",
      title: "Customer-Centric Approach",
      content:
        "We always aim to please the home market, supplying great computers and hardware at great prices to non-corporate customers, through our large Melbourne CBD showroom and our online store.\n\nShop management approach fosters a strong customer service focus in our staff. We prefer to cultivate long-term client relationships rather than achieve quick sales, demonstrated in the measure of our long-term success.",
      image: about3,
    },
    {
      bgColor: "bg-white",
      title: "Innovation and Growth",
      content:
        "We always aim to please the home market, supplying great computers and hardware at great prices to non-corporate customers, through our large Melbourne CBD showroom and our online store.\n\nShop management approach fosters a strong customer service focus in our staff. We prefer to cultivate long-term client relationships rather than achieve quick sales, demonstrated in the measure of our long-term success.",
      image: about4,
      imageClass: "w-[90%]",
      reverse: true,
    },
    {
      bgColor: "bg-black",
      title: "Our Vision for the Future",
      content:
        "We always aim to please the home market, supplying great computers and hardware at great prices to non-corporate customers, through our large Melbourne CBD showroom and our online store.\n\nShop management approach fosters a strong customer service focus in our staff. We prefer to cultivate long-term client relationships rather than achieve quick sales, demonstrated in the measure of our long-term success.",
      image: about5,
    },
  ];

  return (
    <>
      <div className="container mx-auto px-4 md:px-[10%] py-10">
        <Breadcrumb items={breadcrumb} />
        <h1 className="py-4 text-3xl md:text-4xl font-semibold capitalize text-black">
          About Us
        </h1>
      </div>

      <div>
        {sections.map((section, index) => (
          <AboutSection
            key={index}
            bgColor={section.bgColor}
            title={section.title}
            content={section.content}
            image={section.image}
            imageClass={section.imageClass}
            reverse={section.reverse}
          />
        ))}
      </div>
    </>
  );
}
