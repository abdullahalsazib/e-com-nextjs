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

import placeholderImage from "@/../public/placeholder-image/image.png";
import { Button } from "@/components/ui/button";
import { FaAngleDown } from "react-icons/fa";
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

  const numbers = Array.from({ length: 10 }, (_, i) => i);
  const [showAll, setShowAll] = useState(false);
  return (
    <>
      <div className=" z-0  w-full  md:px-[5%] lg:px-[10%] py-5 px-2 ">
        <Carousel images={carouselImages} />
      </div>

      <div className={` px-2 md:px-[5%] lg:px-[10%] `}>
        <div className=" w-full py-2">
          <h2 className=" text-sm md:text-2xl font-semibold md:font-bold">
            Category&apos;s
          </h2>

          <div className="py-3 w-full duration-300 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
            {numbers
              .slice(0, showAll ? numbers.length : 5) // show 5 or all
              .map((key) => (
                <div
                  key={key}
                  className="border border-white/60 hover:scale-105 duration-300 cursor-pointer hover:shadow-lg rounded-full border-dotted w-[150px] h-[150px] overflow-clip m-auto relative flex items-center justify-center bg-blue-500/10 dark:bg-gray-500/20 dark:border-white/10 dark:shadow-gray-50/10"
                >
                  <Image
                    src={placeholderImage} // replace with your placeholderImage
                    alt={`placeholder ${key}`}
                    className="rounded-full w-[90%] m-auto"
                    width={120}
                    height={120}
                  />
                  <div className="w-full h-full absolute top-0 left-0 duration-300 hover:bg-blue-500/30 hover:backdrop-blur-xs m-auto"></div>
                  {/* <p className="absolute -bottom-0">Category {key}</p> */}
                </div>
              ))}
          </div>
          <div className=" w-full flex items-center justify-center">
            {!showAll && (
              <Button
                onClick={() => setShowAll(true)}
                className="text-xs bg-transparent hover:bg-transparent text-black m-auto"
                size={"sm"}
              >
                See More <FaAngleDown className=" text-xs" />
              </Button>
            )}
            {showAll && (
              <Button
                onClick={() => setShowAll(false)}
                className="text-xs bg-transparent hover:bg-transparent text-black m-auto"
                size={"sm"}
              >
                See Less <FaAngleDown className=" rotate-180 text-xs" />
              </Button>
            )}
          </div>
        </div>

        {/* Products sections  */}
        <div className=" pt-7">
          <div className="  flex items-center justify-between w-full">
            <h1 className="text-2xl font-semibold capitalize">New Products</h1>
            <a
              href="#"
              className="text-sm font-semibold capitalize text-blue-500 hover:text-blue-700 duration-200 underline underline-offset-2"
            >
              see more all products
            </a>
          </div>
          {/* in hear some product card's */}
          <div className=" px-4 sm:px-10 md:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-3 mb-10">
            {loading && <h1>Product is Loading...</h1>}
            {error && <h1>{error}</h1>}
            {products.map((product) => (
              <ProductCard
                key={product.ID}
                product={enhanceProductData(product)}
              />
            ))}{" "}
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
