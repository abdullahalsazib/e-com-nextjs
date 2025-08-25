import { motion } from "framer-motion";
import React from "react";

const Vendor_Profile = () => {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.5 }}
        className=" w-full h-[50vh] uppercase bg-white text-black flex items-center justify-center"
      >
        <div className=" text-2xl">vendor profile</div>
      </motion.div>
    </>
  );
};

export default Vendor_Profile;
