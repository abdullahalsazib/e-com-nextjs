"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaTrashAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import product1 from "@/../public/product-image/image-1.png";
import paypal from "@/../public/paypal.svg";
import { motion } from "framer-motion";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "MSI MEG Trident X (Intel i7 1070Kx, 2070 SUPER, 32GB RAM, 1TB SSD)",
      price: 4348.0,
      quantity: 3,
      image: product1,
    },
    {
      id: 2,
      name: "MSI MEG Trident X (Intel i7 1070Kx, 2070 SUPER, 32GB RAM, 1TB SSD)",
      price: 4348.0,
      quantity: 3,
      image: product1,
    },
  ]);

  const [showShipping, setShowShipping] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 12.0;
  const tax = 1.87;
  const gst = 1.81;
  const total = subtotal + shipping + tax + gst;

  // const removeItem = (id) => {
  //   setCartItems(cartItems.filter(item => item.id !== id));
  // };
  //
  // const updateQuantity = (id, newQuantity) => {
  //   if (newQuantity < 1) return;
  //   setCartItems(cartItems.map(item =>
  //     item.id === id ? { ...item, quantity: newQuantity } : item
  //   ));
  // };
  //
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold mb-6"
      >
        Shopping Cart
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
              <h2 className="text-lg font-semibold">Your Cart ({cartItems.length})</h2>
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
                      <h3 className="font-medium text-sm sm:text-base line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-2">
                        <span className="text-lg font-bold">
                          ${item.price.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border rounded-md">
                            <button
                              // onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-3">{item.quantity}</span>
                            <button
                              // onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <button
                            // onClick={() => removeItem(item.id)}
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
          </motion.div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-4"
          >
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

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
                  animate={{ height: 'auto', opacity: 1 }}
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
                  animate={{ height: 'auto', opacity: 1 }}
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

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium mb-4"
            >
              Proceed to Checkout
            </motion.button>

            <div className="text-center">
              <p className="text-sm mb-3">Or check out with:</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-md font-medium flex items-center justify-center gap-2"
              >
                <Image
                  src={paypal}
                  alt="PayPal"
                  width={80}
                  height={20}
                  className="h-5 w-auto"
                />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
