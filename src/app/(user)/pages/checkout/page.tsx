/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartListContext";
import Breadcrumb from "@/components/smallComponent/Breadcrumb";
import { Input } from "@/components/ui/input";
import { CiDiscount1 } from "react-icons/ci";
import { Trash2, Plus, Minus } from "lucide-react";

const breadcrumb = [
  { label: "Home", link: "/", active: false },
  { label: "Products", link: "/pages/products", active: false },
  { label: "Shopping Cart", link: "/pages/shopping-cart", active: false },
  { label: "Checkout", active: true },
];

const CheckoutPage: React.FC = () => {
  const { cart, updateCartItem, removeFromCart } = useCart();
  const [discount, setDiscount] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery"
  );

  const shippingCost = deliveryMethod === "delivery" ? 50 : 0; // free pickup
  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateCartItem(itemId, { quantity: newQuantity });
  };
  const subtotal =
    cart?.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ) || 0;

  const discountAmount = appliedDiscount;

  const tax = 1.87;
  const gst = 1.81;
  const total = subtotal + shippingCost + tax + gst - discountAmount;

  const handleApplyDiscount = () => {
    if (discount === "DISCOUNT10") {
      setAppliedDiscount(subtotal * 0.1); // 10% discount
    } else {
      setAppliedDiscount(0);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 md:px-8">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumb} />

      <h1 className="text-3xl font-bold py-4">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Shipping Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Full Name *</label>
              <Input type="text" placeholder="Enter full name" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email Address *</label>
              <Input type="email" placeholder="Enter email address" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone Number *</label>
              <Input type="text" placeholder="Enter phone number" />
            </div>
          </form>

          {/* Delivery Options */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Delivery Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="delivery"
                  checked={deliveryMethod === "delivery"}
                  onChange={() => setDeliveryMethod("delivery")}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Home Delivery (৳50)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="pickup"
                  checked={deliveryMethod === "pickup"}
                  onChange={() => setDeliveryMethod("pickup")}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Store Pickup (Free)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Cart Review */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Review Your Cart</h2>
          <div className="space-y-4">
            {cart?.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
              >
                {/* Product Image */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <Link href={`/pages/products/${item.product.ID}`}>
                      <h3 className="font-medium hover:underline">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.ID, item.quantity - 1)
                    }
                    className="p-1 border rounded hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.ID, item.quantity + 1)
                    }
                    className="p-1 border rounded hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.ID)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Discount Code */}
          <div className="flex items-center mt-6 border rounded-md p-3">
            <CiDiscount1 className="text-xl text-gray-500 mr-2" />
            <input
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="flex-1 border-none outline-none text-sm px-2"
              placeholder="Discount code"
            />
            <button
              onClick={handleApplyDiscount}
              className="text-blue-600 font-semibold hover:underline"
            >
              Apply
            </button>
          </div>

          {/* Summary */}
          <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>TAX</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST</span>
              <span>${gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Pay Now */}
          <button className="mt-6 w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-white hover:text-black border-2 border-black transition">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
