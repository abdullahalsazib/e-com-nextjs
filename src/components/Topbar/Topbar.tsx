// import { Facebook } from '';
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

const Topbar = () => {
  // const [closeAd, setCloseAd] = useState<boolean>(false);
  return (
    <div
      className={`w-full py-3 px-[10%] bg-blue-600 md:flex xl:flex-row flex-col items-center justify-between `}
    >
      <div className="flex items-center justify-start gap-2">
        <p className="text-sm text-gray-200 capitalize">Mon-Thu:</p>
        <p className="text-sm text-white capitalize font-semibold">
          9:00 AM - 5:30PM
        </p>
      </div>
      <div className="flex items-center justify-center gap-1">
        <p className="text-sm font-light text-slate-100">
          Visit our showroom in 1234 Street Adress City Address, 1234
        </p>
        <Link
          href="/contactus"
          className="text-sm font-semibold text-white underline underline-offset-4 duration-200 hover:underline-offset-2"
        >
          Contact Us
        </Link>
      </div>
      <div className=" relative">
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
        {/* <Button
          variant={"ghost"}
          size={"icon"}
          className="size-8 absolute -top-1.5 -right-30"
          onClick={() => setCloseAd(false)}
        >
          <X />
        </Button> */}
      </div>
    </div>
  );
};

export default Topbar;
