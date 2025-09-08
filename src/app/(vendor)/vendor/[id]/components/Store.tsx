import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import shopad1 from "@/../public/shop/shop_ad1.png";
const Vendor_Store = () => {
  return (
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
      <Link href="/">
        <Image className="w-full" src={shopad1} alt="image" />
      </Link>
    </motion.div>
  );
};

export default Vendor_Store;
