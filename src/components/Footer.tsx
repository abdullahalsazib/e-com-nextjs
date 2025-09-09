"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import payment from "@/../public/payment.svg";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { footerLinks } from "@/data/footerLink";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 * i },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white border-t border-gray-800 mt-10">
      {/* Newsletter Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-[5%] py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
      >
        <motion.div variants={itemVariants} className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-4xl font-bold">
            Sign Up To Our Newsletter
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-3">
            Be the first to hear about the latest offers.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-full md:w-1/2 flex justify-center md:justify-end"
        >
          <div className="flex w-full max-w-sm items-center gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-500"
            />
            <Button
              type="submit"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black transition"
            >
              Subscribe
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Links Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-[5%] py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-center lg:text-left"
      >
        {footerLinks.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <h2 className="text-lg font-semibold mb-4">{item.title}</h2>
            <ul className="space-y-2">
              {item.content.map((item2, index2) => (
                <li key={index2}>
                  <a
                    href={item2.link}
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    {item2.iTitle}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Bar */}
      <div className="px-[5%] py-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Social Icons */}
        <div className="flex gap-4 text-lg">
          <a
            href="#"
            className="p-2 rounded-full border border-gray-600 hover:border-white hover:text-white transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="p-2 rounded-full border border-gray-600 hover:border-white hover:text-white transition"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Payment Icons */}
        <div>
          <Image src={payment} alt="payment" className="h-8 w-auto" />
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          © {year} Shop Pty. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
