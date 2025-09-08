/* eslint-disable @next/next/no-img-element */
"use client";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import p1 from "@/../public/product-image/image-1.png";
import { Product2 } from "../type/product";
import { Button } from "./ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartListContext";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { IoCheckmarkCircle } from "react-icons/io5";
import Link from "next/link";

const defaultProduct: Product2 = {
  ID: 0,
  name: "Product Name",
  description: "Product description not available",
  price: 0,
  stock: 0,
  image_url: p1.src,
};

const ProductCard = ({ product = defaultProduct }: { product?: Product2 }) => {
  // const router = useRouter();
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
    description = "",
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
  // const QuickHandleButton = (e: any, id: number) => {
  //   e.stopPropagation();
  //   router.push(`/pages/products/${id}`);
  //   // /products/${product?.ID}
  // };

  return (
    <div className="bg-white dark:bg-white dark:text-white flex items-center justify-between flex-col border-[1.5] border-slate-100 dark:border-slate-900 hover:shadow-xl transition-shadow duration-500 relative active:scale-105">
      {/* Product Image */}
      <Link
        href={`/pages/products/${product.ID}`}
        className="peer cursor-pointer hover:scale-110 duration-500 bg-transparent w-[full] h-[250px] flex items-center justify-center"
      >
        <img src={`${image_url}`} alt={name} width={"200px"} />
      </Link>

      {/* Product Info */}
      <div className=" peer-hover:bg-blue-300/10 peer-hover:blur-xs duration-500 bg-slate-100 dark:bg-black  w-full  h-[140px] flex flex-col justify-between">
        <div className=" flex flex-col gap-1 items-start justify-start py-2 px-2">
          <div className=" w-full flex items-center justify-between gap-2">
            <Link
              href={`/pages/products/${product.ID}`}
              className="dark:text-gray-100 text-gray-900 hover:underline duration-300"
            >
              <h3 className="text-sm font-bold  line-clamp-1  capitalize">
                {name}
              </h3>
            </Link>

            <span className="text-sm self-start font-bold dark:text-gray-300 text-gray-700">
              <sup> $</sup>
              {price}.<sup>00</sup>
              {/* .toFixed(2) */}
            </span>
          </div>
          {/* <p className="text-xs text-gray-500 line-clamp-1">{description}</p> */}

          <div>
            <div className="flex items-center justify-start w-full relative">
              <div>
                {rating > 0 && (
                  <div className="flex items-center">
                    <div className="flex text-xs">{renderStars()}</div>
                    <span className="text-[12px] text-gray-500 ml-2">
                      ({review_count})
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className=" flex w-full flex-row justify-between items-center gap-1">
          <div className=" flex w-full">
            {/* addTocart */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              disabled={cartLoading || !inStock || !isAuthenticated}
              // className={`text-xs capitalize ring-2 bg-transparent text-black dark:text-white rounded-full px-5 py-1.5  ${cartLoading || !inStock || !isAuthenticated
              //   ? "active:scale-100 hover:scale-100 ring-1 ring-white/50 pointer-events-none bg-black/50"
              //   : "text-gray-400 ring-black/50 dark:ring-white/50 hover:bg-black/100 dark:hover:bg-blue-500/40 hover:ring-blue-500 dark:hover:ring-blue-500 hover:text-white duration-500 active:scale-105"
              //   } `}
              className=" w-full bg-black/70 text-white py-3 px-5 text-sm dark:bg-gray-800/70 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/50 hover:bg-black/90 capitalize duration-300"
            >
              {/* <FaCartArrowDown /> */}
              add to cart
            </button>
          </div>
        </div>
      </div>

      {/* absolute card top */}
      <div className="peer-hover:bg-blue-300/10 peer-hover:blur-xs duration-500 flex justify-between items-center absolute py-3 bg-transparent w-full px-5">
        <p
          className={`text-xs flex items-center gap-1 ${
            inStock ? "text-green-700" : "text-red-600"
          }`}
        >
          <IoCheckmarkCircle className=" animate-pulse" />
          {inStock ? "In stock" : "Out of stock"}
        </p>
        {/* wishlist */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist();
          }}
          size={"icon"}
          className=" hover:scale-105 duration-500 size-9 bg-transparent rounded-full dark:bg-transparent text-black hover:bg-transparent"
        >
          {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
