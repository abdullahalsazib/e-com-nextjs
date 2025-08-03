/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutSide";
import toast from "react-hot-toast";
import { LuShoppingCart } from "react-icons/lu";
import Link from "next/link";
import { useCart } from "../app/context/CartListContext";

const CartListDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, loading, error, cartItemCount, cartTotal } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // console.log("dropdown cart: ", cart);

  useClickOutside(dropdownRef, () => setIsOpen(false));
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Icon Button */}
      <button
        onClick={toggleDropdown}
        className="p-2 relative hover:text-blue-500 transition-colors"
        aria-label="Cart"
      >
        <LuShoppingCart className="text-xl" />
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-10 right-0 z-50 w-80 bg-white rounded-md shadow-lg border border-gray-200 flex flex-col py-3 gap-2">
          <div className="flex flex-col items-center w-full px-4">
            <h1 className="text-xl font-semibold text-black text-center">
              My Cart
            </h1>
            <p className="text-xs text-gray-500 capitalize">
              {cartItemCount} {cartItemCount === 1 ? "item" : "items"} in Cart
            </p>
          </div>

          <div className="py-3 w-full flex flex-col gap-0 max-h-60 overflow-y-auto px-4">
            {loading ? (
              <p className="text-center py-4">Loading cart...</p>
            ) : error ? (
              <p className="text-red-500 text-center py-4">{error}</p>
            ) : !cart || cart.items.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                Your cart is empty
              </p>
            ) : (
              cart.items.map((item) => <CartItem key={item.ID} item={item} />)
            )}
          </div>

          {cart && cart.items.length > 0 && (
            <div className="px-4 border-t border-gray-100 pt-3">
              <div className="flex justify-between font-medium mb-3">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="/shoping-card"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 px-4 rounded-full text-sm text-center bg-blue-500 text-white hover:bg-blue-600 duration-200 font-medium"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 px-4 rounded-full text-sm text-center border border-blue-500 text-blue-500 hover:bg-blue-50 duration-200 font-medium"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CartItem = ({ item }: { item: any }) => {
  const { removeFromCart, updateCartItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItem(item.ID, { quantity: newQuantity });
  };

  return (
    <div className="w-full py-3 flex items-start justify-between border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-3">
        {item.product?.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.product.image_url}
            alt={item.product.name}
            className="w-12 h-12 object-cover rounded"
          />
        )}
        <div className="flex-1">
          <h3 className="font-medium text-sm line-clamp-1">
            {item.product?.name}
          </h3>
          <p className="text-gray-500 text-sm">
            ${item.product?.price?.toFixed(2)}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-6 h-6 flex items-center justify-center border rounded text-sm"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="text-sm w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-6 h-6 flex items-center justify-center border rounded text-sm"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          removeFromCart(item.ID);
          toast.success(`Removed ${item.product?.name} from cart`);
        }}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Remove
      </button>
    </div>
  );
};

export default CartListDropdown;
