"use client";

import { motion } from "framer-motion";
import { FaShippingFast, FaHeadset, FaMoneyBillWave, FaTags } from "react-icons/fa";

const features = [
  {
    icon: <FaShippingFast size={40} />,
    title: "Free Shipping",
    desc: "Free shipping on all order",
  },
  {
    icon: <FaHeadset size={40} />,
    title: "Support 24/7",
    desc: "Free support anytime",
  },
  {
    icon: <FaMoneyBillWave size={40} />,
    title: "Money Return",
    desc: "30 days money back guarantee",
  },
  {
    icon: <FaTags size={40} />,
    title: "Order Discount",
    desc: "Get discount on every order",
  },
];

export default function Features() {
  return (
    <section className="py-12 bg-white ">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center space-y-3 p-6"
          >
            <div className="text-black">{feature.icon}</div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
