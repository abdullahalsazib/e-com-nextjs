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
      >
        <div

          className=" w-full h-[20vh] uppercase bg-white dark:bg-gray-900 dark:text-white text-black grid grid-cols-3 py-5 px-2 items-start justify-start">
          <div className=" ">
            <h1 className=" text-lg text-black font-semibold">Joined</h1>
          </div>
          <div>
            <h1 className=" text-lg text-black font-semibold">Shipped on Time</h1>
          </div>
          <div>
            <h1 className=" text-lg text-black font-semibold">Chat</h1>
          </div>
        </div>
      </motion.div >
    </>
  );
};

export default Vendor_Profile;
