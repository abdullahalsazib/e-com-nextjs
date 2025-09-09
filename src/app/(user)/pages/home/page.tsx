"use client";

import Image from "next/image";

// impor the logo images
import brand1 from "@/../public/Logos/roccat.png";
import brand2 from "@/../public/Logos/msi.png";
import brand3 from "@/../public/Logos/razer.png";
import brand4 from "@/../public/Logos/thermaltake.png";
import brand5 from "@/../public/Logos/adata.png";
import brand6 from "@/../public/Logos/hp.png";
import brand7 from "@/../public/Logos/gigabyte.png";

import { useEffect, useState } from "react";
import { Product2 } from "@/type/product";
import ProductCard from "@/components/Product_card";
import { getProducts } from "@/services/product.service";
import Carousel from "@/components/Slider";
// import Hero_section from "@/components/Hero_section";

const brandLogo = [
  { imgUrl: brand1, alr: "brand1" },
  { imgUrl: brand2, alr: "brand2" },
  { imgUrl: brand3, alr: "brand3" },
  { imgUrl: brand4, alr: "brand4" },
  { imgUrl: brand5, alr: "brand5" },
  { imgUrl: brand6, alr: "brand6" },
  { imgUrl: brand7, alr: "brand7" },
];
import { motion } from "framer-motion";
import { BiError } from "react-icons/bi";
import { Skeleton } from "@/components/ui/skeleton";
import Features from "@/components/Featuers";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
export default function HomePage() {
  const [products, setProducts] = useState<Product2[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();

        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const numbers = Array.from({ length: 20 }, (_, i) => i);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAll, setShowAll] = useState(false);
  return (
    <>
      <div className=" z-0  w-full  md:px-[5%] lg:px-[10%] py-5 px-2 ">
        <Carousel />
      </div>

      <div className={` px-2 md:px-[5%] lg:px-[1%] xl:px-[10%] `}>
        {/* categorys */}
        <div className=" w-full py-10 hidden">
          <div className="flex items-center justify-center space-x-4 mb-7">
            <span className="flex-grow h-[1px] bg-black max-w-[120px]" />
            <h1 className="text-3xl font-bold text-center">Category&apos;s!</h1>
            <span className="flex-grow h-[1px] bg-black max-w-[120px]" />
          </div>

          <div
            className={`
              py-5 w-full grid gap-2 [grid-template-columns:repeat(auto-fit,minmax(120px,1fr))]
            transition-all duration-500 ease-in overflow-hidden  `}
          >
            {numbers
              .slice(0, showAll ? numbers.length : 9) // show 5 or all
              .map((key) => (
                <div key={key}>
                  <>
                    {loading ? (
                      <div>
                        <Skeleton className="  w-[full] h-[100px]" />
                      </div>
                    ) : (
                      <div
                        key={key}
                        className="border py-2 rounded-md border-white/60 hover:scale-105 duration-300 cursor-pointer hover:shadow-lg  border-dotted w-[100%] md:h-[auto] overflow-clip m-auto relative flex items-center justify-center bg-blue-500/10 dark:bg-gray-500/20 dark:border-white/10 dark:shadow-gray-50/10"
                      >
                        <div className=" w-[100px] h-[100px] flex items-center justify-center text-xs">
                          category {key + 1}
                        </div>
                        <div className="w-full h-full absolute top-0 left-0 duration-300 hover:bg-blue-500/20 hover:backdrop-blur-xs m-auto"></div>
                      </div>
                    )}
                  </>
                </div>
              ))}
          </div>
          {/* <div className=" mt-4 w-full flex items-center justify-center">
            <Button
              onClick={() => setShowAll(!showAll)}
              className=" text-xs "
              size={"sm"}
              variant={"outline"}
            >
              {showAll ? "See Less" : "See More"}
            </Button>
          </div> */}
        </div>
        {/* DAILY DEALS! */}
        <div className="w-full py-4">
          <div className="flex items-center justify-center space-x-4 mb-7">
            <span className="flex-grow h-[1px] bg-black max-w-[120px]" />
            <h1 className="text-3xl font-bold text-center">DAILY DEALS!</h1>
            <span className="flex-grow h-[1px] bg-black max-w-[120px]" />
          </div>

          <div className="flex justify-center space-x-8 mt-4 mb-5">
            <button className="text-gray-500 hover:text-black">
              New Arrivals
            </button>
            <button className="font-bold">Best Sellers</button>
            <button className="text-gray-500 hover:text-black">
              Sale Items
            </button>
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 justify-center items-center gap-2 lg:gap-7">
            {products.map((product, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                key={product.ID}
                className="mb-6 break-inside-avoid"
              >
                {/* <ProductCard product={enhanceProductData(product)} /> */}
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          {/* Products sections  */}
          <div>
            <div className="flex items-center justify-center space-x-4 py-5 mb-5 mt-5">
              <span className="flex-grow h-[1px] bg-black max-w-[120px]" />
              <h1 className="text-3xl font-bold text-center">
                Popular Product&apos;s
              </h1>
              <span className="flex-grow h-[1px] bg-black max-w-[120px]" />
            </div>
            {/* in hear some product card's */}

            {/* handle error and loading  */}
            <div>
              {error && (
                <div className=" w-full py-10 h-10 flex items-center justify-center">
                  {" "}
                  <h1 className=" text-red-500 flex gap-3 items-center justify-center">
                    {error} <BiError className=" text-xl" />
                  </h1>
                </div>
              )}
            </div>
            <div className="w-full py-2">
              <div
                className={` grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 justify-center items-center gap-2 lg:gap-7`}
              >
                {loading && (
                  <>
                    {numbers.slice(0, 6).map((key) => (
                      <ProductCardSkeleton key={key} />
                    ))}
                  </>
                )}
                {products.map((product, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    viewport={{ once: true }}
                    key={product.ID}
                    className="mb-6 break-inside-avoid"
                  >
                    {/* <ProductCard product={enhanceProductData(product)} /> */}
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* features */}
        <div>
          <div className="flex items-center justify-center space-x-4 mb-7 mt-5">
            <span className="flex-grow h-[1px] bg-black max-w-[120px]" />
            <h1 className="text-3xl font-bold text-center uppercase">
              our services!
            </h1>
            <span className="flex-grow h-[1px] bg-black max-w-[120px]" />
          </div>
          <Features />
        </div>

        {/* brand animaiton */}
        <div>
          <div className="overflow-hidden py-5 bg-white ">
            <motion.div
              className="flex space-x-10"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 10,
                ease: "linear",
              }}
            >
              {[...brandLogo, ...brandLogo].map((item, index) => (
                <div key={index} className="p-2 flex-shrink-0">
                  <a href="#">
                    <Image
                      src={item.imgUrl}
                      alt={item.alr}
                      width={100}
                      height={60}
                      className="hover:scale-110 duration-300 cursor-pointer"
                    />
                  </a>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}


