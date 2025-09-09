/* eslint-disable @typescript-eslint/no-unused-vars */
import ProductCard from "@/components/Product_card";
import { getProducts } from "@/services/product.service";
import { Product2 } from "@/type/product";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Vendor_Product: React.FC<{
  vendorId: number;
}> = ({ vendorId }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product2[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log(response.data);
        const filteredProducts = response.data.filter(
          (product: Product2) => product.vendor?.id === vendorId
        );

        setProducts(filteredProducts);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [vendorId]);
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
        className=" w-full py-3 px-2  uppercase bg-white dark:bg-gray-900 dark:text-white text-black flex items-center justify-center"
      >
        <div className=" text-2xl grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((item, i) => (
            <ProductCard key={i} product={item} />
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Vendor_Product;
