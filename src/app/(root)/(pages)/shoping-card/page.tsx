"use client";
import Image from "next/image";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import product1 from "@/../public/product-image/image-1.png";
import paypal from "@/../public/paypal.svg";
const ShoppingCart = () => {
  const cartItems = [
    {
      id: 1,
      name: "MSI MEG Trident X (USD-1012AU Intel i7 1070Kx, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty)",
      price: 4348.0,
      quantity: 3,
      image: product1, // Replace with actual image path
    },
    {
      id: 2,
      name: "MSI MEG Trident X (USD-1012AU Intel i7 1070Kx, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty)",
      price: 4348.0,
      quantity: 3,
      image: product1, // Replace with actual image path
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 12.0;
  const tax = 1.87;
  const gst = 1.81;
  const total = subtotal + shipping + tax + gst;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Items</h2>
              <button className="text-blue-500 hover:text-blue-700">
                Update Shopping Cart
              </button>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 py-4 border-b"
              >
                <div className="sm:w-1/4">
                  <Image
                    src={item.image}
                    alt="produxt images"
                    className="w-full h-auto rounded-md"
                  />
                </div>
                <div className="sm:w-3/4">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-bold">
                      ${item.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">
                        Qty: {item.quantity}
                      </span>
                      <button className="text-red-500 hover:text-red-700">
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
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Summary</h2>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Estimate Shipping and Tax</h3>
              <p className="text-sm text-gray-600 mb-2">
                Enter your destination to get a shipping estimate.
              </p>
              <input
                type="text"
                placeholder="Country/Region"
                className="w-full p-2 border rounded-md mb-2"
              />
              <input
                type="text"
                placeholder="Zip/Postal Code"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Apply Discount Code</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter discount code"
                  className="flex-1 p-2 border rounded-md"
                />
                <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md">
                  Apply
                </button>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-500 mb-4">
                (Unavailable - This is only one deposit by us in the United
                Nations for a total of six dollars you will)
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>GST (10%)</span>
                <span>${gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                <span>Order Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
              Proceed to Checkout
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm mb-2">Check out with:</p>
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-md font-medium flex items-center justify-center gap-2">
                <Image src={paypal} alt="paypal" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
