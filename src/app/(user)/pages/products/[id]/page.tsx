/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Product2 } from "@/type/product";
import React, { useEffect, useState } from "react";
import { getProductById } from "@/services/product.service";
import CustomBreadcrumb from "@/components/smallComponent/Breadcrumb";
import Image from "next/image";

const Page = (props: { params: Promise<{ id: string }> }) => {
  const [product, setProducts] = useState<Product2>();
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true);
  const params = React.use(props.params); // unwrap the promise
  const id = params.id;

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductById(id);
        console.log(response.data);
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // find the product that matches the param ID
  // const product = products.find((p) => String(p.ID) === params.id);

  const breadcrumb = [
    { label: "Home", link: "/" },
    { label: "Products", link: "/pages/products" },
    {
      label: !loading ? product?.name ?? "Product not found" : "Loading...",
      active: true,
    },
  ];

  return (
    <div className="w-full py-10 px-5 2xl:px-[20%] border h-screen">
      <CustomBreadcrumb items={breadcrumb} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className=" py-5 grid grid-cols-2 w-full gap-5">
        <div className=" bg-red-400/10 w-full h-[500px] flex flex-col items-center justify-between gap-">
          <div className=" self-start bg-white w-full min-h-[full] flex items-center justify-center  border-2">
            <img
              src={product?.image_url}
              alt={product?.name}
              className=" w-[500px] hover:zoom-in-35"
            />
          </div>
          {/* <div className=" bg-black/20 w-full h-20"></div> */}
        </div>
        <div className=" bg-red-400/30 w-full"></div>
      </div>
    </div>
  );
};

export default Page;
