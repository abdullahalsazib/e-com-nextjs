"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import {
  FaTrashAlt,
  FaChevronDown,
  FaChevronUp,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { motion } from "framer-motion";
import product1 from "@/../public/product-image/image-1.png";
import Breadcrumb from "@/app/components/smallComponent/Breadcrumb";
import { useWishlist } from "@/app/context/WishlistContext";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string | StaticImageData;
}

const ShoppingCart = () => {
  // Initial cart items
  const initialCartItems: Product[] = [
    {
      id: 1,
      name: "MSI MEG Trident X (Intel i7 1070Kx, 2070 SUPER, 32GB RAM, 1TB SSD)",
      price: 4348.0,
      quantity: 3,
      image: product1,
    },
  ];

  const [cartItems, setCartItems] = useState<Product[]>(initialCartItems);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState<"cart" | "wishlist">("cart");
  const [showShipping, setShowShipping] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // console.log("wishlist product form page-shoping: ", wishlist);
  const shipping = 12.0;
  const tax = 1.87;
  const gst = 1.81;
  const total = subtotal + shipping + tax + gst;

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    // Also remove from wishlist if it's there
    if (wishlist.some((item) => item.product.id === id)) {
      removeFromWishlist(id);
    }
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleWishlist = async (product: Product) => {
    const isInWishlist = wishlist.some(
      (item) => item.product.id === product.id
    );
    if (isInWishlist) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist({
        id: product.id,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
        },
      });
    }
  };

  // const moveToCart = (product: Product) => {
  //   // Add to cart if not already there
  //   if (!cartItems.some((item) => item.id === product.id)) {
  //     setCartItems([...cartItems, { ...product, quantity: 1 }]);
  //   }
  // };

  const isInWishlist = (id: number) => {
    return wishlist.some((item) => item.product.id === id);
  };

  const breadcrumb = [
    { label: "Home", link: "/", active: false },
    { label: "Products", link: "/", active: false },
    { label: "Shopping Cart", active: true },
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div>
          <Breadcrumb items={breadcrumb} />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold mb-6"
        >
          {activeTab === "cart" ? "Shopping Cart" : "Your Wishlist"}
        </motion.h1>

        {/* Tab Navigation */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab("cart")}
            className={`px-4 py-2 font-medium ${
              activeTab === "cart"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            Cart ({cartItems.length})
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
          {/* Cart/Wishlist Items */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4"
            >
              {activeTab === "cart" ? (
                <>
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                    <h2 className="text-lg font-semibold">
                      Your Cart ({cartItems.length})
                    </h2>
                    <button className="text-blue-500 hover:text-blue-700 text-sm sm:text-base">
                      Update Shopping Cart
                    </button>
                  </div>

                  {cartItems.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-gray-500">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col sm:flex-row gap-4 py-4"
                        >
                          <div className="sm:w-1/4 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={200}
                              height={200}
                              className="w-full h-auto rounded-md object-contain aspect-square"
                            />
                          </div>
                          <div className="sm:w-3/4">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-sm sm:text-base line-clamp-2">
                                {item.name}
                              </h3>
                              <button
                                onClick={() => toggleWishlist(item)}
                                className="text-red-500 p-1"
                              >
                                {isInWishlist(item.id) ? (
                                  <FaHeart />
                                ) : (
                                  <FaRegHeart />
                                )}
                              </button>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-2">
                              <span className="text-lg font-bold">
                                ${item.price.toFixed(2)}
                              </span>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center border rounded-md">
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                  >
                                    -
                                  </button>
                                  <span className="px-3">{item.quantity}</span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-500 hover:text-red-700 p-1"
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
                            </div>
                            <div className="mt-2 text-right">
                              <span className="font-bold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold mb-4">
                    Your Wishlist ({wishlist.length})
                  </h2>

                  {wishlist.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-gray-500">Your wishlist is empty</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {wishlist.map((wishlistItem) => {
                        const item = {
                          wishlistId: wishlistItem.id,
                          id: wishlistItem.product.id,
                          name: wishlistItem.product.name,
                          price: wishlistItem.product.price,
                          quantity: 1,
                          // image: product1, // You might want to get the actual image from your product data
                        };
                        return (
                          <motion.div
                            key={wishlistItem.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col sm:flex-row gap-4 py-4"
                          >
                            <div className="sm:w-1/4 flex-shrink-0">
                              {/* <Image
                                src={item.image}
                                alt={item.name}
                                width={200}
                                height={200}
                                className="w-full h-auto rounded-md object-contain aspect-square"
                              /> */}
                            </div>
                            <div className="sm:w-3/4">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium text-sm sm:text-base line-clamp-2">
                                  {item.name}
                                </h3>
                                <button
                                  onClick={() =>
                                    removeFromWishlist(item.wishlistId)
                                  }
                                  className="text-red-500 p-1"
                                >
                                  <FaHeart />
                                </button>
                              </div>
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-2">
                                <span className="text-lg font-bold">
                                  ${item.price.toFixed(2)}
                                </span>
                                <div className="flex items-center gap-4">
                                  <button
                                    // onClick={() => moveToCart(item)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>

          {/* Order Summary - Only shown when in cart view */}
          {activeTab === "cart" && (
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-4"
              >
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                {/* Shipping Estimate */}
                <div className="mb-4 border-b pb-4">
                  <button
                    onClick={() => setShowShipping(!showShipping)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="font-medium">Estimate Shipping</h3>
                    {showShipping ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {showShipping && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pt-2"
                    >
                      <p className="text-sm text-gray-600 mb-2">
                        Enter your destination to get shipping estimate.
                      </p>
                      <select className="w-full p-2 border rounded-md mb-2 text-sm">
                        <option>Select Country/Region</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Zip/Postal Code"
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Discount Code */}
                <div className="mb-4 border-b pb-4">
                  <button
                    onClick={() => setShowDiscount(!showDiscount)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="font-medium">Apply Discount Code</h3>
                    {showDiscount ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {showDiscount && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pt-2"
                    >
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter discount code"
                          className="flex-1 p-2 border rounded-md text-sm"
                        />
                        <button className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md text-sm">
                          Apply
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Totals */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    Standard shipping - arrives in 3-5 business days
                  </div>
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <span>GST (10%)</span>
                    <span>${gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium mb-4"
                >
                  Proceed to Checkout
                </motion.button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
