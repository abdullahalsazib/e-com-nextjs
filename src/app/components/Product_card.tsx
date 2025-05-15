"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaCartArrowDown, FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { GrMore } from "react-icons/gr";
import p1 from "@/../public/product-image/image-1.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string | StaticImport;
  inStock: boolean;
}

const defaultProduct: Product = {
  id: 0,
  name: "Product Name",
  description: "Product description not available",
  price: 0,
  rating: 0,
  reviewCount: 0,
  image: p1,
  inStock: false,
};

const ProductCard = ({ product = defaultProduct }: { product?: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Safe destructuring with fallbacks
  const {
    inStock = false,
    image = "/placeholder-product.png",
    name = "Product Name",
    description = "Description not available",
    price = 0,
    originalPrice,
    rating = 0,
    reviewCount = 0,
  } = product || {};

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-[#E9A426]" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-[#E9A426] opacity-50" />);
      } else {
        stars.push(<FaStar key={i} className="text-[#CACDD8]" />);
      }
    }

    return stars;
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div
      className={`bg-white px-4 py-4 flex flex-col cursor-pointer transition-all duration-300 border border-gray-200 rounded-lg relative overflow-hidden ${
        isHovered ? "shadow-lg" : "shadow-sm hover:shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Stock Status */}
      <div className="flex justify-between items-start w-full">
        <p
          className={`text-xs flex items-center gap-1 ${
            inStock ? "text-green-700" : "text-red-600"
          }`}
        >
          <IoCheckmarkCircle />
          {inStock ? "In stock" : "Out of stock"}
        </p>

        {/* Wishlist button (mobile) */}
        <button
          onClick={toggleWishlist}
          className="md:hidden text-gray-400 hover:text-red-500 transition-colors"
        >
          {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </div>

      {/* Product Image */}
      <div className="w-full h-40 md:h-48 flex items-center justify-center my-4 relative">
        <Image
          src={image}
          alt={name}
          width={160}
          height={160}
          className="object-contain w-full h-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-product.png";
          }}
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col w-full space-y-3">
        {/* Rating */}
        <div className="flex items-center">
          <div className="flex">{renderStars()}</div>
          <span className="text-xs text-gray-500 ml-2">({reviewCount})</span>
        </div>

        {/* Product Name/Description */}
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          <span className="font-bold">EX DISPLAY:</span> {description}
        </h3>

        {/* Price */}
        <div className="flex flex-col">
          {originalPrice && (
            <del className="text-xs text-gray-400">
              ${originalPrice.toFixed(2)}
            </del>
          )}
          <span className="text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Mobile Actions */}
      <div className="w-full flex items-center justify-between gap-2 mt-4 md:hidden">
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart || !inStock}
          className={`flex-1 py-2 px-3 rounded-full text-xs font-medium flex items-center justify-center gap-1 transition-colors ${
            isAddingToCart || !inStock
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          <FaCartArrowDown />
          <span>Add</span>
        </button>
        <button className="p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">
          <GrMore size={14} />
        </button>
      </div>

      {/* Desktop Hover Actions */}
      <div
        className={`hidden md:flex flex-col gap-2 absolute inset-0 bg-white bg-opacity-95 p-4 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-end">
          <button
            onClick={toggleWishlist}
            className="text-gray-700 hover:text-red-500 transition-colors"
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}
          </button>
        </div>

        <div className="flex flex-col justify-center items-center h-full gap-3">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || !inStock}
            className={`w-full py-2 px-4 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              isAddingToCart || !inStock
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            <FaCartArrowDown />
            <span>Add to Cart</span>
          </button>
          <button className="w-full py-2 px-4 rounded-full text-sm font-medium flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100">
            <GrMore size={14} />
            <span>Quick View</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
