// src/services/products.ts;

import { Product } from "@/type/product";
import apiClient from "@/lib/api-client";

// get products user/customer - admin/vendor and superadmin
export const getProducts = async () => {
  const response = await apiClient.get("/api/v1/products/customer");
  return response;
};

export const getProductsVendor = async () => {
  const response = await apiClient.get("/api/v1/products/vendor");
  return response;
};
export const getProductsSuperadmin = async () => {
  const response = await apiClient.get("/api/v1/products/superadmin");
  return response;
};

// get product by id user/customer - admin/vendor and superadmin
export const getProductById = async (id: string) => {
  const response = await apiClient.get(`/api/v1/products/customer/${id}`);
  return response;
};
export const getProductByIdVendor = async (id: string) => {
  const response = await apiClient.get(`/api/v1/products/vendor/${id}`);
  return response;
};
export const getProductByIdSuperadmin = async (id: string) => {
  const response = await apiClient.get(`/api/v1/products/superadmin/${id}`);
  return response;
};

// create product
export const createProduct = async (productData: Product) => {
  const response = await apiClient.post(
    "/api/v1/products/vendor",
    productData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// update product
export const updateProduct = async (
  id: number | string,
  productData: Product
) => {
  const response = await apiClient.put(
    `/api/v1/products/vendor/${id}`,
    productData
  );
  return response;
};

// deleteProduct
export const deleteProduct = async (id: number | string) => {
  const response = await apiClient.delete(`/api/v1/products/vendor/${id}`);
  return response;
};

// update - PATCH - product status
export const updateProductStatus = async (id: number, status: string) => {
  const response = await apiClient.patch(
    `/api/v1/products/vendor/${String(id)}/status`,
    { status }
  );
  return response;
};
