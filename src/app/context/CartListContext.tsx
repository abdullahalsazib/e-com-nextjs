"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";

interface Product {
  ID: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  CategoryID: number;
}

interface CartItem {
  ID: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  product: Product;
}

interface Cart {
  ID: number;
  user_id: number;
  items: CartItem[];
}

interface AddToCartRequest {
  product_id: number;
  quantity: number;
}

interface UpdateCartItemRequest {
  quantity: number;
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  fetchCartList: () => Promise<void>;
  addToCart: (request: AddToCartRequest) => Promise<void>;
  updateCartItem: (
    itemId: number,
    request: UpdateCartItemRequest
  ) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartItemCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const getAuthToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const cartItemCount = useMemo(
    () => cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0,
    [cart]
  );

  const cartTotal = useMemo(
    () =>
      cart?.items.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
      ) || 0,
    [cart]
  );

  const fetchCartList = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = getAuthToken();
      if (!token) {
        setCart(null);
        return;
      }

      const response = await apiClient.get("/auth/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("data: ", response.data);

      const cartData = response.data?.data;
      if (cartData?.items && Array.isArray(cartData.items)) {
        setCart(cartData);
      } else {
        throw new Error("Invalid cart structure");
      }
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.error || "Failed to fetch cart"
        : "An unknown error occurred";

      setError(errorMessage);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setCart(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = getAuthToken();
    if (user && token) {
      fetchCartList();
    }
  }, [fetchCartList, user]);

  const addToCart = useCallback(
    async (request: AddToCartRequest) => {
      if (!user) {
        toast.error("Please login to add items to cart");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.post<{ data: Cart }>(
          "/auth/cart/items",
          request,
          {
            headers: { Authorization: `Bearer ${getAuthToken()}` },
          }
        );

        setCart(response.data.data);
        toast.success("Item added to cart");
      } catch (err) {
        const errorMessage = axios.isAxiosError(err)
          ? err.response?.data?.error || "Failed to add item to cart"
          : "An unknown error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  const updateCartItem = useCallback(
    async (itemId: number, request: UpdateCartItemRequest) => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.put<{ data: Cart }>(
          `/auth/cart/items/${itemId}`,
          request,
          {
            headers: { Authorization: `Bearer ${getAuthToken()}` },
          }
        );
        setCart(response.data.data);
        toast.success("Cart item updated");
      } catch (err) {
        const errorMessage = axios.isAxiosError(err)
          ? err.response?.data?.error || "Failed to update item"
          : "An unknown error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  const removeFromCart = useCallback(
    async (itemId: number) => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.delete<{ data: Cart }>(
          `/auth/cart/items/${itemId}`,
          {
            headers: { Authorization: `Bearer ${getAuthToken()}` },
          }
        );
        setCart(response.data.data);
        toast.success("Item removed from cart");
      } catch (err) {
        const errorMessage = axios.isAxiosError(err)
          ? err.response?.data?.error || "Failed to remove item"
          : "An unknown error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  const clearCart = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      await apiClient.delete("/auth/cart/clear", {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });

      setCart(null);
      toast.success("Cart cleared");
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.error || "Failed to clear cart"
        : "An unknown error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        fetchCartList,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        cartItemCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
