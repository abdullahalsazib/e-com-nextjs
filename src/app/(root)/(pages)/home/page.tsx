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
import Carousel from "@/components/Slider";
import Carsol1 from "@/../public/images/cursol1.png";
import TestimonialSection from "@/components/Testimonials";

import { useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import { Product2 } from "@/app/data/product";
import ProductCard from "@/components/Product_card";
import Hero_section from "@/components/Hero_section";

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
export default function HomePage() {
  const [products, setProducts] = useState<Product2[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/api/v1/products");
        // console.log("response: ", response.data);
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
  return (
    <>
      {/* <div className="w-full bg-white dark:bg-gray-800">
        <Carousel images={carouselImages} />
      </div> */}

      {/* hero section */}
      <Hero_section />

      <div className={`px-[10%] bg-white dark:bg-gray-950 `}>
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
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 pt-3 mb-10">
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
        <div className=" py-5">
          <div className="flex items-center justify-between gap-7">
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
            <News_card />
            <News_card />
            <News_card />
            <News_card />
          </div>
        </div>
        {/* reviews sections */}
        <TestimonialSection />
      </div>
      {/* <Footer /> */}
    </>
  );
}
