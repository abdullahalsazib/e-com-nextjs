"use client";

import Image from "next/image";
import styles from "./home.module.css";
import zipLogo from "@/../public/Logos/zipLogo.svg";

// impor the logo images
import brand1 from "@/../public/Logos/roccat.png";
import brand2 from "@/../public/Logos/msi.png";
import brand3 from "@/../public/Logos/razer.png";
import brand4 from "@/../public/Logos/thermaltake.png";
import brand5 from "@/../public/Logos/adata.png";
import brand6 from "@/../public/Logos/hp.png";
import brand7 from "@/../public/Logos/gigabyte.png";
import News_card from "@/components/News_card";
import Carsol1 from "@/../public/images/cursol1.png";
import TestimonialSection from "@/components/Testimonials";

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
const carouselImages = [
  { src: Carsol1.src, alt: "Banner 1" },
  { src: Carsol1.src, alt: "Banner 1" },
];

// import placeholderImage from "@/../public/placeholder-image/image.png";
import { Button } from "@/components/ui/button";
import { BiError } from "react-icons/bi";
import { Skeleton } from "@/components/ui/skeleton";
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
  // Function to enhance product data with additional fields
  const enhanceProductData = (product: Product2) => {
    return {
      ...product,
      // Add rating and review count if not provided
      rating: product.rating || Math.random() * 2 + 3, // Random rating between 3-5
      review_count: product.review_count || Math.floor(Math.random() * 100),
      // Add original_price if not provided (for showing discount)
      original_price:
        product.original_price ||
        (Math.random() > 0.5 ? product.price * 1.2 : undefined), // 50% chance to show original price
    };
  };
  const numbers = Array.from({ length: 20 }, (_, i) => i);
  const [showAll, setShowAll] = useState(false);
  return (
    <>
      <div className=" z-0  w-full  md:px-[5%] lg:px-[10%] py-5 px-2 ">
        <Carousel images={carouselImages} />
      </div>

      <div className={` px-2 md:px-[5%] lg:px-[1%] xl:px-[10%] `}>
        <div>
          <div className=" w-full py-10">
            <h2 className=" text-lg md:text-xl text-center md:text-left font-semibold md:font-bold lg:py-2">
              Category&apos;s
            </h2>

            <div
              className={`
              py-3 w-full grid gap-2 [grid-template-columns:repeat(auto-fit,minmax(120px,1fr))]
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
                          {/* <p className="absolute -bottom-0">Category {key}</p> */}
                        </div>
                      )}
                    </>
                  </div>
                ))}
            </div>
            <div className=" mt-4 w-full flex items-center justify-center">
              <Button
                onClick={() => setShowAll(!showAll)}
                className=" text-xs "
                size={"sm"}
                variant={"outline"}
              >
                {showAll ? "See Less" : "See More"}
              </Button>
            </div>
          </div>

          {/* Products sections  */}
          <div>
            <div className="  flex items-center justify-between w-full">
              <h1 className="lg:text-xl font-semibold capitalize">
                New Products
              </h1>
              <a
                href="#"
                className=" text-xs  font-semibold capitalize text-blue-500 hover:text-blue-700 duration-200 underline underline-offset-2"
              >
                see more all products
              </a>
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
                className="
              grid gap-6 sm:grid-cols-2 
                  md:grid-cols-4 
                  lg:grid-cols-5 
                  xl:grid-cols-6"
              >
                {loading && (
                  <>
                    {numbers.slice(0, 6).map((key) => (
                      <ProductCardSkeleton key={key} />
                    ))}
                  </>
                )}
                {products.map((product) => (
                  <div key={product.ID} className="mb-6 break-inside-avoid">
                    <ProductCard product={enhanceProductData(product)} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className=" dark:bg-[#e7e7e7] bg-[#F5F7FF] w-full py-5 mb-7 px-0 flex items-center justify-center">
            <div className="flex items-center justify-center gap-3 ">
              <Image src={zipLogo} alt="ziplogo" /> |{" "}
              <span className="  text-[#272560] font-light">
                <span className="font-bold text-lg">own </span>it now, up to 6
                months interest free{" "}
                <a href="#" className=" text-xs underline underline-offset-2">
                  learn more
                </a>
              </span>
            </div>
          </div>
          {/* product with ad banner */}
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-3 mb-10">
            <div
              className={` w-full bg-red-400 h-[100%] ${styles.adBanner} flex items-center justify-evenly py-10 flex-col gap-10`}
            >
              <h1 className="text-3xl text-center self-center font-black capitalize text-white">
                Customer builds
              </h1>
              <a
                href="#"
                className=" text-xs font-light underline underline-offset-2 text-white hover:text-blue-400 duration-200"
              >
                see all products
              </a>
            </div>
            {loading && (
              <>
                {numbers.slice(0, 6).map((key) => (
                  <div key={key}>
                    <ProductCardSkeleton key={key} />
                  </div>
                ))}
              </>
            )}
            {products.map((product) => (
              <ProductCard
                key={product.ID}
                product={enhanceProductData(product)}
              />
            ))}{" "}
          </div>
          {/* ad and product 2 */}
          <div className=" py-3">
            <div className=" flex items-center justify-between w-full">
              <ul className="flex items-center justify-start gap-6 py-3">
                <li className=" text-slate-700 hover:text-gray-700 duration-200 cursor-pointer  underline-offset-4 underline font-bold ">
                  MSI GS Series
                </li>
                <li className=" text-slate-500 hover:text-gray-700 duration-200 cursor-pointer  underline-offset-4 hover:underline font-bold">
                  MSI GS Series
                </li>
                <li className=" text-slate-500 hover:text-gray-700 duration-200 cursor-pointer  underline-offset-4 hover:underline font-bold">
                  MSI GS Series
                </li>
                <li className=" text-slate-500 hover:text-gray-700 duration-200 cursor-pointer  underline-offset-4 hover:underline font-bold">
                  MSI GS Series
                </li>
              </ul>
              <a
                href="#"
                className="text-sm font-semibold capitalize text-blue-500 hover:text-blue-700 duration-200 underline underline-offset-2"
              >
                see more all products
              </a>
            </div>
            {/* in hear some product card's */}
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-3 mb-10">
              <div
                className={` w-full bg-red-400 h-[100%] ${styles.adBanner2} flex items-center justify-evenly py-10 flex-col gap-10`}
              >
                <h1 className="text-3xl text-center self-center font-black capitalize text-white">
                  MSI Leptops
                </h1>
                <a
                  href="#"
                  className=" text-xs font-light underline underline-offset-2 text-white hover:text-blue-400 duration-200"
                >
                  see all products
                </a>
              </div>
              {loading && (
                <>
                  {numbers.slice(0, 6).map((key) => (
                    <div key={key}>
                      <ProductCardSkeleton key={key} />
                    </div>
                  ))}
                </>
              )}
              {products.map((product) => (
                <ProductCard
                  key={product.ID}
                  product={enhanceProductData(product)}
                />
              ))}{" "}
            </div>
          </div>
          {/* ad and product 3 */}
          <div className=" py-4">
            {/* <ProductCategorySection /> */}
            {/* in hear some product card's */}
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-3 mb-10">
              <div
                className={` w-full bg-red-400 h-[100%] ${styles.adBanner3} flex items-center justify-evenly py-10 flex-col gap-10`}
              >
                <h1 className="text-3xl text-center self-center font-black capitalize text-white">
                  Desktops
                </h1>
                <a
                  href="#"
                  className=" text-xs font-light underline underline-offset-2 text-white hover:text-blue-400 duration-200"
                >
                  see all products
                </a>
              </div>
              {loading && (
                <>
                  {numbers.slice(0, 6).map((key) => (
                    <>
                      <ProductCardSkeleton key={key} />
                    </>
                  ))}
                </>
              )}
              {products.map((product) => (
                <ProductCard
                  key={product.ID}
                  product={enhanceProductData(product)}
                />
              ))}{" "}
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-3 mb-10">
              <div
                className={` w-full bg-red-400 h-[100%] ${styles.adBanner4} flex items-center justify-evenly py-10 flex-col gap-10`}
              >
                <h1 className="text-3xl text-center self-center font-black capitalize text-white">
                  Gaming Monitors
                </h1>
                <a
                  href="#"
                  className=" text-xs font-light underline underline-offset-2 text-white hover:text-blue-400 duration-200"
                >
                  see all products
                </a>
              </div>
              {loading && (
                <>
                  {numbers.slice(0, 6).map((key) => (
                    <>
                      <ProductCardSkeleton key={key} />
                    </>
                  ))}
                </>
              )}
              {products.map((product) => (
                <ProductCard
                  key={product.ID}
                  product={enhanceProductData(product)}
                />
              ))}{" "}
            </div>
          </div>
        </div>
        {/* brand logo's */}
        <div className=" py-5 bg-blue-50">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 justify-center items-center gap-7">
            {brandLogo.map((item, index) => (
              <div key={index} className=" p-2">
                <a href="#">
                  <Image
                    className=" hover:scale-110 duration-300 cursor-pointer"
                    key={index}
                    src={item.imgUrl}
                    alt={item.alr}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
        {/* news, offers, and more */}
        <div className=" w-full mt-5">
          <h1 className="text-2xl font-semibold capitalize mb-5">
            follow us on instagram for news, offers & more
          </h1>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 pt-3 mb-10">
            <News_card />
            <News_card />
            <News_card />
            <News_card />
            <News_card />
            {/* <News_card />
            <News_card />
            <News_card />
            <News_card /> */}
          </div>
        </div>
        {/* reviews sections */}
        <TestimonialSection />
      </div>
      {/* <Footer /> */}
    </>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className=" rounded-sm shadow-sm p-3 flex flex-col gap-2">
      {/* Image */}
      <div className="flex items-center justify-center">
        <Skeleton className="h-[200px] w-[200px] rounded-md " />
      </div>

      {/* Title + Price */}
      <div className="flex items-center justify-between w-full">
        <Skeleton className="h-5 w-28 rounded " /> {/* product name */}
        <Skeleton className="h-5 w-16 rounded " /> {/* price */}
      </div>

      {/* Description */}
      <Skeleton className="h-4 w-full rounded " />
      <Skeleton className="h-4 w-2/3 rounded " />

      {/* Rating */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-24 rounded " />
        <Skeleton className="h-3 w-6 rounded " />
      </div>

      {/* Button */}
      <Skeleton className="h-8 w-full rounded-full " />
    </div>
  );
}
