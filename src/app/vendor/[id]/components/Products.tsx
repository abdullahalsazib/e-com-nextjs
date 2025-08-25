import { motion } from "framer-motion";

const Vendor_Product = () => {
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
        <div className=" text-2xl">vendor Products</div>
      </motion.div>
    </>
  );
};

export default Vendor_Product;
