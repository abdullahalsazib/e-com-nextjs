import Tabs from "@/app/components/smallComponent/Tab";
import Image from "next/image";

//image import
import paypal from "@/../public/paypal.svg";

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
          <div className=" w-1/2 h-screen bg-[#F5F7FF]"></div>
          <div className=" w-1/2 h-screen bg-[#000]"></div>
        </div>
      </div>
    </>
  );
};

export default page;
