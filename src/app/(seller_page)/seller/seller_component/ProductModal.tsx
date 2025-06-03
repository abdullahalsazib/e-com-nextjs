"use client";

import { Product } from "@/app/data/product";
import { useState } from "react";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
}

const ProductModal = ({ isOpen, onClose, onSubmit }: ProductModalProps) => {
  const [product, setProduct] = useState<Product>({
    product_name: "",
    description: "",
    price: 0,
    stock: 0,
    image_url: "",
    category_id: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: ["price", "stock", "category_id"].includes(name)
        ? parseFloat(value)
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product);
    setProduct({
      product_name: "",
      description: "",
      price: 0,
      stock: 0,
      image_url: "",
      category_id: 0,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Add New Product
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Product Name", name: "product_name", type: "text" },
              { label: "Price ($)", name: "price", type: "number" },
              { label: "Stock", name: "stock", type: "number" },
              { label: "Category ID", name: "category_id", type: "number" },
              { label: "Image URL", name: "image_url", type: "text" },
              { label: "Description", name: "description", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {label}
                </label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={
                    (product[name as keyof Product] ?? "") as
                      | string
                      | number
                      | readonly string[]
                  }
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            ))}

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
