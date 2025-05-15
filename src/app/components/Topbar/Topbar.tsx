// import { Facebook } from '';
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

const Topbar = () => {
  return (
    <div className=" hidden w-full py-3 px-[10%] bg-[#020202] md:flex xl:flex-row flex-col items-center justify-between">
      <div className="flex items-center justify-start gap-2">
        <p className="text-sm text-gray-400 capitalize">Mon-Thu:</p>
        <p className="text-sm text-white capitalize font-semibold">
          9:00 AM - 5:30PM
        </p>
      </div>
      <div className="flex items-center justify-center gap-1">
        <p className="text-sm font-light text-slate-300">
          Visit our showroom in 1234 Street Adress City Address, 1234
        </p>
        <a href="#" className="text-sm font-semibold text-white underline underline-offset-4 duration-200 hover:underline-offset-2">
          Contact Us
        </a>
      </div>
      <div>
        <div className="font-semibold flex items-center justify-center gap-5 text-sm text-white">
          <h1>Call us: {`(00)90-0029`}</h1>
          <div className="flex items-center justify-center gap-2 text-lg">
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
