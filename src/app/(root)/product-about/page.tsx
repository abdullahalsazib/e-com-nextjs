import Tabs from "@/app/components/smallComponent/Tab";
import Image from "next/image";

//image import
import paypal from "@/../public/paypal.svg";
import product1 from "@/../public/product-image/image2.png";
import zipTextLogo from "@/../public/ZipTextLogo.svg";
import { GoChevronRight } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa6";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { VscMail } from "react-icons/vsc";

const tab = [
  { title: "About Product" },
  { title: "Details" },
  { title: "Specs" },
];
const page = () => {
  return (
    <>
      <div>
        <div className=" flex items-center justify-between py-6 px-[10%] border-b-1 border-gray-300">
          <Tabs tab={tab} />
          <div className="flex items-center justify-end gap-3">
            <p className=" font-light text-gray-600">
              On Sale from{" "}
              <span className="font-semibold text-gray-800">$3,299.00</span>
            </p>
            <input
              type="number"
              placeholder="00"
              className=" w-[70px] bg-slate-100 focus:outline-slate-300 py-2 px-4"
            />
            <div className="flex items-center justify-center gap-2 text-sm">
              <button className=" py-2.5 px-6 rounded-full bg-blue-500 hover:bg-blue-600 duration-200 cursor-pointer font-semibold text-white capitalize">
                add to cart
              </button>
              <button className=" py-2.5 px-7 rounded-full bg-[#FFB800] hover:bg-[#ffd877] duration-200 cursor-pointer font-semibold text-white capitalize">
                <Image src={paypal} className=" w-full" alt="paypal" />
              </button>
            </div>
          </div>
        </div>
        <div className=" w-full px-[10%] flex items-center justify-center">
          <div className=" w-1/2 bg-[#F5F7FF] flex items-center justify-end">
            <div className=" w-[80%]  h-screen py-20  px-4">
              <div className="py-5 text-xs font-semibold uppercase flex items-center justify-start gap-1 text-gray-800">
                <p>Home</p>
                <GoChevronRight className=" text-blue-500" />
                <p>Products</p>
                <GoChevronRight className=" text-blue-500" />
                <p className=" font-light text-gray-600">MSI WS Series</p>
              </div>
              <div className=" ">
                <h1 className=" text-5xl font-semibold capitalize py-5">
                  MSI MPG Trident 3
                </h1>
                <a
                  href="#"
                  className="text-blue-500 text-xs underline underline-offset-1 hover:text-blue-700 duration-200"
                >
                  Be the first to review this product
                </a>
                <p className=" text-xl text-justify font-light uppercase mt-5 pr-5">
                  MSI MPG Trident 3 10SC-005AU Intel i7 10700F, 2060 SUPER, 16GB
                  RAM, 512GB SSD, 2TB HDD, Windows 10 Home, Gaming Keyboard and
                  Mouse 3 Years Warranty Gaming Desktop
                </p>
                <div className=" mt-20 w-full flex items-center justify-between">
                  <p className="font-bold">
                    Have a Question?
                    <a href="#" className="text-blue-500">
                      Contact Us
                    </a>
                  </p>
                  <p className="text-gray-600 uppercase">SKU D5515AI</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-1/2 py-20 h-screen bg-[#fff]">
            <div className=" flex items-start justify-start">
              <div className=" px-3 py-3 w-[50%] relative">
                <div className=" absolute top-0 left-0 px-3 py-2 flex items-center justify-center flex-col gap-2">
                  <IconBtn Icon={<FaRegHeart />} />

                  <IconBtn
                    Icon={<HiOutlineBars3BottomRight className=" rotate-90" />}
                  />
                  <IconBtn Icon={<VscMail />} />
                </div>
                <Image src={product1} alt="product image" className="m-auto" />
              </div>
            </div>
            <div className=" px-10 py-10">
              <Image src={zipTextLogo} alt="zip brand" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

const IconBtn: React.FC<{
  Icon: React.ReactNode;
  className?: string;
}> = ({ className, Icon }) => {
  return (
    <>
      <button
        className={` p-1 text-lg text-gray-500 border-2 border-slate-400 rounded-full ${className} hover:text-gray-800 duration-300 hover:border-gray-800 font-bold`}
      >
        {Icon}
      </button>
    </>
  );
};
