/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Input } from "@/components/ui/input";

import React, { useEffect, useState } from "react";
import { getVendorByIdNoAuth } from "@/services/vendor.service";
import Vendor_Profile from "./components/Profile";
import Vendor_Product from "./components/Products";
import Vendor_Store from "./components/Store";
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
  const [switchActive, setSwitchActive] = useState<
    "store" | "products" | "profile"
  >("store");
  const [error, setError] = useState<string>("");
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
        setError("Failed to load product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <div className="w-full h-screen px-2 md:px-[5%] 2xl:px-[20%] border bg-slate-100 dark:bg-black">
        <hr className="mb-2" />
        <div className="bg-white dark:bg-slate-200">
          <div className="w-full h-[150px] lg:h-[130px] bg-gradient-to-l to-blue-600/50 from-blue-700/70 relative">
            <div className=" absolute top-0 left-0 w-[auto] h-auto lg:h-full py-3 flex items-center justify-start">
              <div className=" w-[100%] min-h-full bg-white/60 dark:bg-black/10 backdrop-blur-lg flex items-center justify-between gap-5 px-5 lg:py-2 py-4">
                <div className="w-full hidden lg:block lg:w-[80px] h-[80px] bg-gradient-to-tl rounded-full border-2 from-red-400/60 to-lime-500/10">
                  {/* for vendor image */}
                </div>
                <div>
                  {error ? (
                    "vendor fetch to faild"
                  ) : (
                    <>
                      <h2 className=" text-lg dark:text-black py-1 font-semibold capitalize">
                        {loading ? "loading.." : vendor?.shop_name}
                      </h2>
                      <p className=" text-xs font-bold text-slate-500 dark:text-slate-300">
                        12394 Followers
                      </p>
                      <p className="text-xs mt- text-slate-600 dark:text-slate-100">
                        80% Seller Ratings
                      </p>
                    </>
                  )}
                </div>
                <div className=" flex flex-col items-start lg:items-center justify-end gap-2">

                  <button className=" flex items-center justify-center py-2 px-4 border text-xs font-semibold capitalize bg-white text-black/70 dark:bg-blue-500/20 dark:text-white hover:bg-white/20 duration-300 active:scale-105">
                    {/* <IoChatboxEllipsesOutline /> */}
                    follow
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full py-2 flex items-center justify-between gap-5 px-2 pb-2">
            <div className=" flex items-center gap-3">
              {/* <div className=" text-black dark:text-black">Category</div> */}
              <div className=" text-sm capitalize flex items-center gap-2 lg:gap-2">
                <button
                  className={`capitalize px-3 py-1 text-sm border font-normal ${switchActive === "store"
                    ? "text-blue-500 dark:text-blue-500 "
                    : "text-gray-500"
                    }`}
                  onClick={() => setSwitchActive(`store`)}
                >
                  store
                </button>

                <button
                  className={`capitalize px-3 py-1 text-sm border font-normal ${switchActive === "products"
                    ? "text-blue-500 dark:text-blue-500 "
                    : "text-gray-500"
                    }`}
                  onClick={() => setSwitchActive(`products`)}
                >
                  products
                </button>
                <button
                  className={`capitalize px-3 py-1 text-sm border font-normal ${switchActive === "profile"
                    ? "text-blue-500 dark:text-blue-500 "
                    : "text-gray-500"
                    }`}
                  onClick={() => setSwitchActive(`profile`)}
                >
                  profile
                </button>
              </div>
            </div>
            <div className=" hidden lg:block">
              <Input className=" text-sm" placeholder="Search in Store" />
            </div>
          </div>
        </div>
        <hr className=" my-2" />
        <div className=" w-ful">
          {switchActive === "store" && <Vendor_Store />}
          {switchActive === "profile" && <Vendor_Profile />}
          {switchActive === "products" && <Vendor_Product />}
        </div>
      </div>
    </>
  );
};

export default page;
