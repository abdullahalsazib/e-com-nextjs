// src/services/products.ts;

import { Product } from "@/app/data/product";
import apiClient from "@/lib/api-client";

export const getProducts = async () => {
  const response = await apiClient.get("/api/v1/products");
  return response;
};

export const getProductById = async (id: string) => {
  const response = await apiClient.get(`/api/v1/products/${id}`);
  return response;
};

export const createProduct = async (productData: Product) => {
  const response = await apiClient.post("/api/v1/products/", productData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const updateProduct = async (
  id: number | string,
  productData: Product
) => {
  const response = await apiClient.put(`/api/v1/products/${id}`, productData);
  return response;
};
export const deleteProduct = async (id: number | string) => {
  const response = await apiClient.delete(`/api/v1/products/${id}`);
  return response;
};
