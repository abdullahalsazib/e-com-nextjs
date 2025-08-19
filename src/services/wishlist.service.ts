import { WishlistItemWithProduct } from "@/type/type";
import apiClient from "@/lib/api-client";

export type WishlistItem = {
  id: number;
  product_id: number;
  created_at: string;
  product: {
    id: number;
    name: string;
    price: number;
    image?: string;
  };
};

export const getWishlist = async (): Promise<WishlistItemWithProduct[]> => {
  const response = await apiClient.get("/wishlist", {
    withCredentials: true,
  });
  return response.data;
};

export const addToWishlistApi = async (
  productId: number
): Promise<WishlistItemWithProduct> => {
  const response = await apiClient.post("/wishlist/add", { productId });
  return response.data;
};

export const removeFromWishlist = async (itemId: number): Promise<void> => {
  const response = await apiClient.delete(`/wishlist/${itemId}`);
  return response.data;
};
export const clearWishlist = async (): Promise<void> => {
  const response = await apiClient.delete("/wishlist/clear");
  return response.data;
};

export const importWishlist = async (
  items: { product_id: number }[]
): Promise<void> => {
  const response = await apiClient.post("/wishlist/import", items);
  return response.data;
};
