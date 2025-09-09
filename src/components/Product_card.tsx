/* eslint-disable @next/next/no-img-element */
"use client";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import type { Product2 } from "../type/product";
import { Button } from "./ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartListContext";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { IoCheckmarkCircle } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";

const defaultProduct: Product2 = {
  ID: 0,
  name: "Product Name",
  description: "Product description not available",
  price: 0,
  stock: 0,
  image_url: "",
};

const ProductCard = ({ product = defaultProduct }: { product?: Product2 }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const wishlistedItem = wishlist.find(
    (item) => item?.product?.id === product.ID
  );
  const isWishlisted = !!wishlistedItem;
  const navigate = useRouter();
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
    image_url = "",
    name = "Product Name",
    price = 0,
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
        stars.push(
          <FaStar key={i} className="text-amber-400 drop-shadow-sm" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-amber-400 opacity-50" />);
      } else {
        stars.push(
          <FaStar key={i} className="text-gray-300 dark:text-gray-600" />
        );
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

  return (
    <div className="group bg-white dark:bg-white/10 rounded-xl border border-gray-200 dark:border-black hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-black/50">
        <Link
          href={`/pages/products/${product.ID}`}
          className="block w-full h-full"
        >
          <img
            src={image_url}
            alt={name}
            className="w-full p-4 h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Stock Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              inStock
                ? "bg-green-100/90 text-green-700 dark:bg-green-900/90 dark:text-green-300"
                : "bg-red-100/90 text-red-700 dark:bg-red-900/90 dark:text-red-300"
            }`}
          >
            <IoCheckmarkCircle className="w-3 h-3" />
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3">
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist();
            }}
            size="sm"
            variant="ghost"
            className="w-9 h-9 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 hover:scale-110 transition-all duration-200 shadow-sm"
          >
            {isWishlisted ? (
              <FaHeart className="w-4 h-4 text-red-500" />
            ) : (
              <FaRegHeart className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            )}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Product Name and Price */}
        <div className="space-y-1">
          <Link
            href={`/pages/products/${product.ID}`}
            className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
          >
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 text-sm leading-tight">
              {name}
            </h3>
          </Link>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              ${price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">{renderStars()}</div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({review_count})
            </span>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            if (!isAuthenticated) {
              navigate.push("/login");
            } else {
              handleAddToCart();
            }
          }}
          // disabled={!inStock || !isAuthenticated}
          className="w-full active:scale-105 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white text-white font-medium py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {"Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
