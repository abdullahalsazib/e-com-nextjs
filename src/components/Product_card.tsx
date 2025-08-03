/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaCartArrowDown, FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import p1 from "@/../public/product-image/image-1.png";
import { useRouter } from "next/navigation";
import { Product2 } from "../app/data/product";
import { useWishlist } from "../app/context/WishlistContext";
import { toast } from "sonner";
import { useCart } from "../app/context/CartListContext";
import { useAuth } from "../app/context/AuthContext";
import { Button } from "./ui/button";
import { CiLocationArrow1 } from "react-icons/ci";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Verified } from "lucide-react";
import { CustomToolTip } from "./custom_compoent/CustomToolTip";

const defaultProduct: Product2 = {
  ID: 0,
  name: "Product Name",
  description: "Product description not available",
  price: 0,
  stock: 0,
  image_url: p1.src,
};

const ProductCard = ({ product = defaultProduct }: { product?: Product2 }) => {
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

  const { isAuthenticated } = useAuth();
  const QuickHandleButton = (e: any, id: number) => {
    e.stopPropagation();
    router.push(`/products/${id}`);
    // /products/${product?.ID}
  };
  return (
    <div className="bg-white shadow-lg border-[1.5] border-gray-200 rounded-md">
      {/* Product Image */}
      <div className="w-full p-1 h-40 md:h-48 ">
        <img
          src={image_url}
          alt={name}
          className="object-cover w-full rounded-md border-[1.5] border-gray-200"
        />
      </div>
      <div className=" p-2">
        {/* Stock Status */}

        {/* Product Info */}
        <div className="flex flex-col w-full space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <CustomToolTip
              children={
                <Badge
                  variant="secondary"
                  className="bg-blue-500 text-white dark:bg-blue-600 self-start"
                >
                  <Verified /> john deo
                </Badge>
              }
              bodyContent="Mr. John Deo"
            />
            <div className=" flex gap-2">
              <CustomToolTip
                children={
                  <Badge
                    variant="secondary"
                    className="bg-blue-500 text-white dark:bg-blue-600"
                  >
                    New
                  </Badge>
                }
                bodyContent="New Uploaded Product"
              />

              <CustomToolTip
                children={
                  <Badge
                    variant="secondary"
                    className="bg-green-500 text-white dark:bg-green-500"
                  >
                    {product.stock}
                  </Badge>
                }
                bodyContent="Available stock"
              />
            </div>
          </div>
          <div className="flex items-center justify-start w-full relative">
            <div>
              {rating > 0 && (
                <div className="flex items-center">
                  <div className="flex">{renderStars()}</div>
                  <span className="text-xs text-gray-500 ml-2">
                    ({review_count})
                  </span>
                </div>
              )}
            </div>
            <div className="flex justify-between items-start absolute -top-0 right-0">
              <p
                className={`text-xs flex items-center gap-1 ${
                  inStock ? "text-green-700" : "text-red-600"
                }`}
              >
                <IoCheckmarkCircle />
                {inStock ? "In stock" : "Out of stock"}
              </p>{" "}
            </div>
          </div>

          <h3 className="text-sm font-bold text-gray-900 ">{name}</h3>
          <p className=" text-xs text-gray-500 w-full">{product.description}</p>

          <div className="flex items-center justify-between">
            {/* {original_price && original_price > price && (
              <del className="text-xs text-gray-400">
                ${original_price.toFixed(2)}
              </del>
            )} */}
            <del className="text-sm font-bold text-gray-600">
              ${price.toFixed(2)}
            </del>
            <span className="text-lg font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center gap-1">
            <div className=" flex gap-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                disabled={cartLoading || !inStock || !isAuthenticated}
                size={"icon"}
                variant={"secondary"}
                className=" size-9 "
              >
                <FaCartArrowDown />
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist();
                }}
                size={"icon"}
                variant={"secondary"}
                className=" size-9"
              >
                {isWishlisted ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </Button>
            </div>
            <Button
              onClick={(e: any) => QuickHandleButton(e, product.ID)}
              size={"lg"}
              variant={"secondary"}
              className=" w-ful"
            >
              <CiLocationArrow1 />
              <span>Open</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
