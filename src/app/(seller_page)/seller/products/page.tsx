/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/app/context/AuthContext";
import { getCategorys } from "@/services/category.service";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "@/services/product.service";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Category {
  ID: number;
  Name: string;
}
interface Product {
  ID: number;
  product_name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category_id: number;
  Category: {
    Name: string;
  };
  user_id?: number;
}

interface ProductFormData {
  product_name: string;
  description: string;
  price: number | string;
  stock: number | string;
  image_url: string;
  category_id: number;
}

const Products = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    product_name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
    category_id: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategorys();
        setCategories(response.data.categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setIsFetching(true);
    try {
      const response = await getProducts();
      const filtered = response.data.filter(
        (p: Product) => p.user_id === user?.ID
      );
      setProducts(filtered);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to load products");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (user?.ID) fetchProducts();
  }, [user?.ID]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "category_id" ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      product_name: "",
      description: "",
      price: "",
      stock: "",
      image_url: "",
      category_id: 0,
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !formData.product_name ||
      !formData.price ||
      !formData.stock ||
      !formData.category_id
    ) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    try {
      const productPayload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category_id: Number(formData.category_id),
      };

      if (isEditing && editingId) {
        await updateProduct(editingId, productPayload);
        toast.success("Product updated successfully!");
      } else {
        await createProduct({ ...productPayload });
        toast.success("Product created successfully!");
      }

      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      product_name: product.product_name || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      image_url: product.image_url || "",
      category_id: product.category_id || 0,
    });
    setEditingId(product.ID);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-6 dark:text-black">
      <h2 className="text-2xl font-bold mb-6">Products</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-4"
      >
        <h1 className="text-lg font-bold">
          {isEditing ? "Edit Product" : "Create New Product"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Name *
            </label>
            <input
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stock *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            >
              <option value={0} disabled>
                -- Select a category --
              </option>
              {categories.map((cat) => (
                <option key={cat.ID} value={cat.ID}>
                  {cat.Name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {isLoading
              ? "Saving..."
              : isEditing
              ? "Update Product"
              : "Add Product"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="text-red-500 underline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white shadow rounded-lg overflow-hidden mt-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Product", "Price", "Stock", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isFetching ? (
              <tr>
                <td colSpan={4} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6">
                  No products available
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.ID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-4">
                    {p.image_url && (
                      <img
                        src={p.image_url}
                        alt={p.product_name}
                        className="h-10 w-10 rounded object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">
                        {p.product_name}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {p.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">${p.price.toFixed(2)}</td>
                  <td className="px-6 py-4">{p.stock} in stock</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-indigo-600 hover:underline mr-4"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(p.ID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
