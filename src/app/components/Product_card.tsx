/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaCartArrowDown, FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { GrMore } from "react-icons/gr";
import p1 from "@/../public/product-image/image-1.png";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product2 } from "../data/product";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";

const defaultProduct: Product2 = {
  ID: 0,
  name: "Product Name",
  description: "Product description not available",
  price: 0,
  stock: 0,
  image_url: p1.src,
};

const ProductCard = ({ product = defaultProduct }: { product?: Product2 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const router = useRouter();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isWishlisted = wishlist.some((item) => item.product.id === product.ID);

  const toggleWishlist = async () => {
    try {
      if (isWishlisted) {
        await removeFromWishlist(product.ID);
        toast.success(`Removed ${product.name} from wishlist`);
      } else {
        await addToWishlist(product.ID);
        toast.success(`Added ${product.name} to wishlist`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Safe destructuring with fallbacks
  const {
    stock = 0,
    image_url = "sorce-of-image.jpg",
    name = "Product Name",
    // description = "Description not available",
    price = 0,
    original_price,
    rating = 0,
    review_count = 0,
  } = product || {};

  const inStock = stock > 0;

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

  // const toggleWishlist = () => {
  //   if (isWishlisted) {
  //     const item = wishlist.find((item) => item.product.id === product.ID);
  //     if (item) {
  //       removeFromWishlist(item.product.id);

  //       toast.success(`Remove Item: ${product.name}`);
  //     }
  //   } else {
  //     addToWishlist({
  //       product_id: product.ID,

  //       product: {
  //         id: product.ID,
  //         price: product.price,
  //         name: product.name,
  //         image: product.image_url,
  //       },
  //     });
  //     toast.success(`Wishlist add: ${product.name}`);
  //   }
  // };

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
        <img width={160} height={160} src={image_url} alt={name} />
      </div>

      {/* Product Info */}
      <div className="flex flex-col w-full space-y-3">
        {/* Rating */}
        {rating && (
          <div className="flex items-center">
            <div className="flex">{renderStars()}</div>
            <span className="text-xs text-gray-500 ml-2">({review_count})</span>
          </div>
        )}

        {/* Product Name/Description */}
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {name}
        </h3>

        {/* Price */}
        <div className="flex flex-col">
          {original_price && (
            <del className="text-xs text-gray-400">
              ${original_price.toFixed(2)}
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
        <button
          onClick={() => router.push(`/product/${product?.ID}`)}
          className="p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
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
          <Link
            href={`/products/${product?.ID}`}
            className="w-full py-2 px-4 rounded-full text-sm font-medium flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100"
          >
            <GrMore size={14} />
            <span>Quick View</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
