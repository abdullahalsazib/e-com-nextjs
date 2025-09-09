/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { FaTrashAlt, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/smallComponent/Breadcrumb";
import { useCart } from "@/context/CartListContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ShoppingCart = () => {
  const { cart, updateCartItem, removeFromCart, cartItemCount, cartTotal } =
    useCart();

  const { wishlist, removeFromWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState<"cart" | "wishlist">("cart");
  const navigare = useRouter();
  const subtotal = cartTotal;
  const tax = 1.87;
  const gst = 1.81;
  const total = subtotal  + tax + gst;

  const breadcrumb = [
    { label: "Home", link: "/", active: false },
    { label: "Products", link: "/pages/products", active: false },
    { label: "Shopping Cart", active: true },
  ];
  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateCartItem(itemId, { quantity: newQuantity });
  };

  const handleRemove = async (itemId: number) => {
    await removeFromCart(itemId);
  };

  const { isAuthenticated } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-black">
      <Breadcrumb items={breadcrumb} />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl py-2 text-black dark:text-gray-100 md:text-3xl font-bold mb-6"
      >
        {activeTab === "cart" ? "Shopping Cart" : "Your Wishlist"}
      </motion.h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab("cart")}
          className={`px-4 py-2 font-medium ${
            activeTab === "cart"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Cart ({cartItemCount})
        </button>
        <button
          onClick={() => setActiveTab("wishlist")}
          className={`px-4 py-2 font-medium ${
            activeTab === "wishlist"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Wishlist ({wishlist.length})
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart/Wishlist Section */}

        <div className="lg:w-2/3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-4"
          >
            {activeTab === "cart" ? (
              <>
                {isAuthenticated ? (
                  <>
                    <h2 className="text-lg font-semibold mb-4">
                      Your Cart ({cartItemCount})
                    </h2>
                    {!cart || cart.items.length === 0 ? (
                      <p className="text-gray-500 py-8 text-center">
                        Your cart is empty
                      </p>
                    ) : (
                      <div className="divide-y">
                        {cart.items.map((item) => (
                          <motion.div
                            key={item.ID}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col sm:flex-row gap-4 py-4"
                          >
                            <div className="sm:w-1/4 flex-shrink-0">
                              <img
                                src={item.product.image_url}
                                alt={item.product.name}
                                width={200}
                                height={200}
                                className="w-full h-auto rounded-md object-contain aspect-square"
                              />
                            </div>
                            <div className="sm:w-3/4">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium text-sm sm:text-base line-clamp-2">
                                  {item.product.name}
                                </h3>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-lg font-bold">
                                  ${item.product.price.toFixed(2)}
                                </span>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center border rounded-md">
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item.ID,
                                          item.quantity - 1
                                        )
                                      }
                                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                    >
                                      -
                                    </button>
                                    <span className="px-3">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item.ID,
                                          item.quantity + 1
                                        )
                                      }
                                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <button
                                    onClick={() => handleRemove(item.ID)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                  >
                                    <FaTrashAlt />
                                  </button>
                                </div>
                              </div>
                              <div className="mt-2 text-right">
                                <span className="font-bold">
                                  $
                                  {(item.product.price * item.quantity).toFixed(
                                    2
                                  )}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className=" flex items-center justify-center gap-10 text-xl">
                    <p>Sign in required</p>

                    <Link href={"/register"} className=" underline">
                      Sign up
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  Your Wishlist ({wishlist.length})
                </h2>
                {wishlist.length === 0 ? (
                  <p className="text-gray-500 py-8 text-center">
                    Your wishlist is empty
                  </p>
                ) : (
                  <div className="divide-y">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-4"
                      >
                        <span className="font-medium">{item.product.name}</span>
                        <div className="flex items-center gap-3">
                          <span>${item.product.price.toFixed(2)}</span>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-red-500"
                          >
                            <FaHeart />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>

        {/* Order Summary */}
        {activeTab === "cart" && isAuthenticated && (
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 sticky top-4"
            >
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2 text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {/* <div className="flex justify-between mb-2 text-sm">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div> */}
              <div className="flex justify-between mb-2 text-sm">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span>GST</span>
                <span>${gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigare.push(`/pages/checkout`)}
                // disabled={cartItemCount === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium mt-4"
              >
                Proceed to Checkout
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
