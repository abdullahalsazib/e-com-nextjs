"use client";
import React, { useState } from "react";
import Product_card from "./Product_card";
import { products } from "../data/product";

const ProductCategorySection = () => {
  // Dynamic category data
  const categories = [
    { id: 1, name: "MSI GS Series", active: true },
    { id: 2, name: "MSI GT Series", active: false },
    { id: 3, name: "MSI GL Series", active: false },
    { id: 4, name: "MSI GE Series", active: false },
  ];

  // Sample products data - replace with your actual data

  const featuredCategory = "MSI Laptops";

  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const handleCategoryChange = (categoryId: number) => {
    setActiveCategory(categoryId);
    // Here you would typically filter products based on the selected category
    // For now we'll just demonstrate the UI interaction
  };

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8 w-full">
      {/* Category Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
        <div className="overflow-x-auto w-full sm:w-auto">
          <ul className="flex items-center gap-4 py-3 whitespace-nowrap">
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`text-sm md:text-base font-semibold cursor-pointer transition-colors duration-200 ${
                  activeCategory === category.id
                    ? "text-gray-900 underline underline-offset-4"
                    : "text-slate-500 hover:text-gray-700 hover:underline underline-offset-4"
                }`}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#"
          className="text-sm font-semibold capitalize text-blue-500 hover:text-blue-700 duration-200 underline underline-offset-2 self-end sm:self-center"
        >
          See all products
        </a>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pt-3 mb-10">
        {/* Featured Category Banner - shows on larger screens */}

        {/* Mobile Featured Banner - shows on small screens */}
        <div className="md:hidden bg-gradient-to-r from-blue-600 to-purple-600 w-full h-40 rounded-lg flex items-center justify-center flex-col gap-4 col-span-full">
          <h2 className="text-xl text-center font-bold capitalize text-white px-4">
            {featuredCategory}
          </h2>
          <a
            href="#"
            className="text-xs font-light underline underline-offset-2 text-white hover:text-blue-200 duration-200"
          >
            Shop now
          </a>
        </div>

        {/* Product Cards */}
        {products.map((product, index) => (
          <Product_card key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCategorySection;
