// src/services/products.ts;

import apiClient from "@/lib/api-client";

export const getProducts = async () => {
  const response = await apiClient.get('api/v1/products');
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await apiClient.get(`/api/v1/products/${id}`);
  return response.data;
}; 