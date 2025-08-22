/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { BsShop } from "react-icons/bs";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import shopad1 from "@/../public/shop/shop_ad1.png";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getVendorByIdNoAuth } from "@/services/vendor.service";
interface ProductPageProps {
  params: Promise<{ id: string }>; // params is now a Promise
}

interface vendorTyps {
  id: number;
  shop_name: string;
  user: {
    id: number;
    name: string;
  };
}

const page: React.FC<ProductPageProps> = ({ params }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [vendor, setVendor] = useState<vendorTyps>();
  // Unwrap the Promise with React.use()
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getVendorByIdNoAuth(String(id));
        setVendor(response);
        console.log(response);
      } catch (err) {
        // setError("Failed to load product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  return (
    <>
      <div className="w-full h-screen 2xl:px-[20%] border bg-slate-100 dark:bg-black">
        <hr className="  mb-2" />
        <div className="bg-white dark:bg-slate-600">
          <div className="w-full h-[130px] bg-gradient-to-l to-violet-600/10 from-blue-700/70 relative">
            <div className=" absolute top-0 left-0 w-[auto] h-full py-3 flex items-center justify-start">
              <div className=" w-[100%] min-h-full bg-white/60 dark:bg-black/10 backdrop-blur-lg flex items-center justify-between gap-5 px-5">
                <div className=" w-[80px] h-[80px] bg-gradient-to-tl from-black/60 to-lime-500/10"></div>
                <div className="">
                  <h2 className=" text-lg dark:text-white py-1 font-semibold capitalize">
                    {loading ? "loading.." : vendor?.shop_name}
                  </h2>
                  <p className=" text-xs text-slate-700 dark:text-slate-300">
                    12394 Followers
                  </p>
                  <p className="text-xs mt-4 text-slate-600 dark:text-slate-400">
                    80% Seller Ratings
                  </p>
                </div>
                <div className=" flex items-center justify-end gap-2">
                  <button className="flex items-center text-sm capitalize justify-center flex-col border-2 border-black/50 w-[90px] h-[70px]">
                    <IoChatboxEllipsesOutline />
                    chat Now
                  </button>
                  <button className="flex items-center text-sm capitalize justify-center flex-col border-2 border-black/50  w-[90px] h-[70px]">
                    <BsShop />
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full py-2 flex items-center justify-between gap-10 px-2 pb-2">
            <div className=" flex items-center gap-3">
              <div>Category</div>
              <div className=" text-sm capitalize flex items-center gap-10  px-10">
                <p className=" cursor-pointer font-semibold text-gray-500 ">
                  {" "}
                  store
                </p>
                <p className=" cursor-pointer font-semibold text-gray-500 ">
                  {" "}
                  Products
                </p>
                <p className=" cursor-pointer font-semibold text-gray-500 ">
                  {" "}
                  Profile
                </p>
              </div>
            </div>
            <div>
              <Input placeholder="Search in Store" />
            </div>
          </div>
        </div>
        <hr className=" my-2" />
        <div className=" w-full">
          <Link href="/">
            <Image className="w-full" src={shopad1} alt="image" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
