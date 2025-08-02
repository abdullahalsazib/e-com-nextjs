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
import { useCart } from "../context/CartListContext";
import { useAuth } from "../context/AuthContext";

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
  const router = useRouter();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart, loading: cartLoading } = useCart();

  // Safely find if current product is in wishlist
  const wishlistedItem = wishlist.find(
    (item) => item?.product?.id === product.ID
  );
  const isWishlisted = !!wishlistedItem;

  const toggleWishlist = async () => {
    try {
      if (isWishlisted) {
        if (wishlistedItem?.id) {
          await removeFromWishlist(wishlistedItem.id);
          toast.success(`Removed ${product.name} from wishlist`);
        }
      } else {
        await addToWishlist({
          id: product.ID,

          product: {
            id: product.ID,
            name: product.name,
            price: product.price,
            // image_url: product.image_url,
          },
        });
        toast.success(`Added ${product.name} to wishlist`);
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
      console.error(error);
    }
  };

  const {
    stock = 0,
    image_url = p1.src,
    name = "Product Name",
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

  const handleAddToCart = async () => {
    try {
      await addToCart({
        product_id: product.ID,
        quantity: 1,
      });
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      toast.error("Failed to add item to cart");
      console.error(error);
    }
  };

  const { isAuthenticated } = useAuth()
  return (
    <div
      className={`bg-white px-4 py-4 flex flex-col cursor-pointer transition-all duration-300 border border-gray-200 rounded-lg relative overflow-hidden ${isHovered ? "shadow-lg" : "shadow-sm hover:shadow-md"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Stock Status */}
      <div className="flex justify-between items-start w-full">
        <p
          className={`text-xs flex items-center gap-1 ${inStock ? "text-green-700" : "text-red-600"
            }`}
        >
          <IoCheckmarkCircle />
          {inStock ? "In stock" : "Out of stock"}
        </p>

        {/* Wishlist button (mobile) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist();
          }}
          className="md:hidden text-gray-400 hover:text-red-500 transition-colors"
        >
          {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </div>

      {/* Product Image */}
      <div className="w-full h-40 md:h-48 flex items-center justify-center my-4 relative">
        <img
          width={160}
          height={160}
          src={image_url}
          alt={name}
          className="object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col w-full space-y-3">
        {rating > 0 && (
          <div className="flex items-center">
            <div className="flex">{renderStars()}</div>
            <span className="text-xs text-gray-500 ml-2">({review_count})</span>
          </div>
        )}

        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {name}
        </h3>

        <div className="flex flex-col">
          {original_price && original_price > price && (
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
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={cartLoading || !inStock}
          className={`flex-1 py-2 px-3 rounded-full text-xs font-medium flex items-center justify-center gap-1 transition-colors ${cartLoading || !inStock
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
        >
          <FaCartArrowDown />
          <span>{cartLoading ? "Adding..." : "Add"}</span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/products/${product?.ID}`);
          }}
          className="p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <GrMore size={14} />
        </button>
      </div>

      {/* Desktop Hover Actions */}
      <div
        className={`hidden md:flex flex-col gap-2 absolute inset-0 bg-gradient-to-r from-indigo-100 to-blue-200 p-4 duration-300 ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist();
            }}
            className=" text-xl text-gray-900 hover:text-red-500 transition-colors"
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

            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={cartLoading || !inStock || !isAuthenticated}

            className={`w-full py-2 px-4 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-colors ${cartLoading || !isAuthenticated || !inStock
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
          >
            <FaCartArrowDown />
            <span>{cartLoading ? "Adding..." : "Add to Cart"}</span>
          </button>
          <Link
            href={`/products/${product?.ID}`}
            onClick={(e) => e.stopPropagation()}
            className="w-full py-2 px-4 rounded-full text-sm font-medium flex items-center justify-center gap-2 border border-gray-100 hover:border-0 hover:bg-gray-900 text-white"
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
