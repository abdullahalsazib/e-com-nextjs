"use client";
import { useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useClickOutside } from "@/hooks/useClickOutSide";
import { useWishlist } from "../app/context/WishlistContext";
import { toast } from "sonner";
import { WishlistItemWithProduct } from "../app/type/type";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
type WishlistItem = {
  id: number;
  name: string;
  image: string;
  price: number;
};
const WishlistDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { wishlist, clearWishlist, loading, error } = useWishlist();
  const dropdownRef = useRef<HTMLDivElement>(null);
  // console.log("dropdown: ", wishlist);

  useClickOutside(dropdownRef, () => setIsOpen(false));
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Wishlist Icon Button */}
      <Button
        size={"icon"}
        variant={"secondary"}
        className="size-8"
        onClick={toggleDropdown}
        // className="p-2 relative hover:text-blue-500 transition-colors"
      >
        <FaHeart />
        {wishlist.length > 0 && (
          <Badge
            variant={"default"}
            title="counter"
            className="absolute size-5 bg-red-500 text-white -top-1.5 -right-1.5"
          >
            {wishlist.length}
          </Badge>
        )}
      </Button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-10 right-0 z-50 w-80 bg-white rounded-md shadow-lg border border-gray-200 flex items-center justify-center flex-col py-3 gap-2">
          <div className="flex items-center justify-center flex-col w-full">
            <h1 className="text-xl font-semibold text-black text-center">
              My Wishlist
            </h1>
            <p className="text-xs text-gray-500 capitalize">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"} in
              Wishlist
            </p>
          </div>

          {/* <button className="py-2 px-6 text-sm rounded-full border-blue-500 border-2 bg-white text-blue-500 hover:border-blue-400 hover:bg-blue-500 hover:text-white duration-200"> */}
          {/*   View or edit Wishlist */}
          {/* </button> */}

          <div className="py-5 w-full flex items-center justify-center flex-col gap-0 max-h-60 overflow-y-auto">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : wishlist.length === 0 ? (
              <p className="text-gray-500">Your wishlist is empty</p>
            ) : (
              wishlist.map((item, index) => (
                <WishlistItem key={index} item={item} />
              ))
            )}
          </div>

          <div className="px-5 w-full flex items-center justify-center gap-2 flex-col">
            <button
              onClick={() => clearWishlist()}
              className=" py-2 px-4 text-center"
            >
              Clear all Items
            </button>
            <Link
              href={"/shoping-card"}
              className="flex items-center justify-center w-full py-3 px-6 rounded-full text-sm bg-blue-500 text-white hover:bg-blue-600 duration-200 capitalize font-bold"
            >
              View Full Wishlist
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const WishlistItem = ({ item }: { item: WishlistItemWithProduct }) => {
  const { removeFromWishlist } = useWishlist();

  return (
    <div className="w-full px-4 py-2 flex items-center justify-between border-b border-gray-100">
      <div className="flex items-center gap-3">
        {/* {item.product.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-12 h-12 object-cover rounded"
          />
        )} */}
        <div>
          <h3 className="font-medium text-sm">{item.product.name}</h3>
          <p className="text-gray-500 text-sm">${item.product.price}</p>
        </div>
      </div>
      <button
        onClick={() => {
          removeFromWishlist(item.id);
          // console.log("the remove item is trugerd: ", item.id); // for debuging
          toast.success(`Remove item: ${item.product.name}`);
        }}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default WishlistDropdown;
