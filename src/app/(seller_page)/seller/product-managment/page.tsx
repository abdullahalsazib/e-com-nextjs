"use client";
import { useState } from "react";
import {
  FiPlus,
  FiUpload,
  FiImage,
  FiX,
  FiChevronDown,
  FiCheck,
  FiDownload,
} from "react-icons/fi";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: "draft" | "published" | "archived";
  images: string[];
};

export default function ProductManagement() {
  const [activeTab, setActiveTab] = useState<"create" | "upload">("create");
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    category: "",
    status: "draft",
    images: [],
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Beauty",
    "Sports",
    "Books",
    "Toys",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleStatusChange = (status: Product["status"]) => {
    setNewProduct((prev) => ({ ...prev, status }));
  };

  const handleCategorySelect = (category: string) => {
    setNewProduct((prev) => ({ ...prev, category }));
    setShowCategoryDropdown(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...files]);

      // Simulate image upload and preview
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setNewProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...imageUrls],
      }));
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...newProduct.images];
    updatedImages.splice(index, 1);
    setNewProduct((prev) => ({ ...prev, images: updatedImages }));

    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
    };
    setProducts((prev) => [...prev, product]);

    // Reset form
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      category: "",
      status: "draft",
      images: [],
    });
    setSelectedFiles([]);

    alert("Product created successfully!");
  };

  const handleBulkUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Product Management
            </h1>
            <p className="text-gray-600">
              {activeTab === "create"
                ? "Create new product"
                : "Bulk upload products"}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab("create")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeTab === "create" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300"}`}
            >
              <FiPlus />
              <span>Create Product</span>
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeTab === "upload" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300"}`}
            >
              <FiUpload />
              <span>Bulk Upload</span>
            </button>
          </div>
        </div>

        {/* Create Product Tab */}
        {activeTab === "create" && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <form onSubmit={handleCreateProduct}>
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Product Information
                </h2>

                {/* Basic Info */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Product Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. Wireless Headphones"
                    />
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category*
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowCategoryDropdown(!showCategoryDropdown)
                        }
                        className="w-full flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-left focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        {newProduct.category || "Select a category"}
                        <FiChevronDown className="text-gray-400" />
                      </button>
                      {showCategoryDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-300">
                          {categories.map((category) => (
                            <div
                              key={category}
                              onClick={() => handleCategorySelect(category)}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                            >
                              {category}
                              {newProduct.category === category && (
                                <FiCheck className="text-blue-500" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Price*
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="stock"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Stock Quantity*
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={newProduct.stock}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Detailed product description..."
                  />
                </div>

                {/* Images */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images*
                  </label>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {newProduct.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Preview ${index}`}
                          className="h-24 w-24 object-cover rounded-md border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    ))}
                    <label
                      htmlFor="image-upload"
                      className="h-24 w-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <FiImage className="text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">Add Image</span>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Upload at least 3 images (max 8). First image will be used
                    as the main display.
                  </p>
                </div>

                {/* Status */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Status
                  </label>
                  <div className="flex gap-4">
                    {(
                      ["draft", "published", "archived"] as Product["status"][]
                    ).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleStatusChange(status)}
                        className={`px-4 py-2 rounded-md border ${newProduct.status === status ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 bg-white text-gray-700"}`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Variations (optional) */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product Variations (optional)
                    </label>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Add Variation
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                    <p className="text-sm text-gray-500">
                      Add variations like size, color, etc. Each variation can
                      have its own price and stock.
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Publish Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Bulk Upload Tab */}
        {activeTab === "upload" && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <form onSubmit={handleBulkUpload}>
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Bulk Product Upload
                </h2>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                  <div className="flex flex-col items-center justify-center">
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      Drag and drop files here
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      or click to browse files (CSV, Excel, or ZIP with images)
                    </p>
                    <label
                      htmlFor="bulk-upload"
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                    >
                      Select Files
                    </label>
                    <input
                      id="bulk-upload"
                      type="file"
                      accept=".csv,.xlsx,.xls,.zip"
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Template Download */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FiDownload className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        Download our{" "}
                        <a
                          href="#"
                          className="font-medium underline hover:text-blue-600"
                        >
                          product template file
                        </a>{" "}
                        to ensure proper formatting.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="mb-6">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Uploading...
                      </span>
                      <span className="text-sm font-medium text-gray-500">
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Instructions */}
                <div className="border border-gray-200 rounded-lg p-4 mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-3">
                    Bulk Upload Instructions
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>
                      CSV/Excel files should include all required product fields
                    </li>
                    <li>
                      For images, include URLs or use ZIP with image files named
                      to match SKUs
                    </li>
                    <li>Maximum file size: 20MB</li>
                    <li>First row should contain column headers</li>
                    <li>Review our formatting guidelines before uploading</li>
                  </ul>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? "Uploading..." : "Start Upload"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Recent Products (only shown when not empty) */}
        {products.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Recently Added Products
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Stock
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {product.images.length > 0 && (
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-md object-cover"
                                  src={product.images[0]}
                                  alt=""
                                />
                              </div>
                            )}
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {product.category}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.stock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.status === "published"
                                ? "bg-green-100 text-green-800"
                                : product.status === "draft"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {product.status.charAt(0).toUpperCase() +
                              product.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            Edit
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
