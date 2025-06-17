/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import apiClient from "@/lib/api-client";
import { WishlistContextType, WishlistItemWithProduct } from "../type/type";
import toast from "react-hot-toast";

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItemWithProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  // const isLoggedIn = Boolean(getAuthToken());

  // 🧠 Load wishlist on mount
  useEffect(() => {
    const loadWishlist = async () => {
      const token = getAuthToken();

      if (token) {
        const localWishlistStr = localStorage.getItem("wishlist");
        const localWishlist: WishlistItemWithProduct[] = localWishlistStr
          ? JSON.parse(localWishlistStr)
          : [];

        if (localWishlist.length > 0) {
          try {
            await importWishlist(
              localWishlist.map((item) => ({ product_id: item.product.id }))
            );
            localStorage.removeItem("wishlist");
          } catch (err) {
            console.error("❌ Failed to import local wishlist:", err);
          }
        }

        await fetchWishlist();
      } else {
        const stored = localStorage.getItem("wishlist");
        const parsed = stored ? JSON.parse(stored) : [];
        setWishlist(parsed);
      }
    };

    loadWishlist();
  }, []);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      // console.log("🪪 Fetched authToken:", token); // Debugging line

      if (!token) throw new Error("Not logged in");

      const response = await apiClient.get("/auth/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      // console.log("data form fetch wishlist: ", data);

      // if (Array.isArray(data)) {
      //   console.log(data); // ✅ <- THIS was missing
      // } else {
      //   console.error("Unexpected wishlist format:", data);
      //   toast.error("Invalid wishlist data");
      // }

      if (Array.isArray(data)) {
        setWishlist(data);
      } else {
        console.warn("Unexpected wishlist format:", data);
        toast.error("Invalid wishlist data");
      }

      setError(null);
    } catch (err: any) {
      console.error("❌ fetchWishlist error:", err);
      setError("Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  };

  const saveLocalWishlist = (items: WishlistItemWithProduct[]) => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  };

  const addToWishlist = async (product: WishlistItemWithProduct) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const exists = wishlist.some(
        (item) => item.product.id === product.product.id
      );

      if (exists) {
        toast.error("Already in wishlist");
        return;
      }

      if (token) {
        const { data } = await apiClient.post(
          "/auth/wishlist/add",
          { product_id: product.product.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(data.message);

        const uploaded = [...wishlist, product];
        fetchWishlist();

        // console.log("if token is true: ", product);
        // console.log(
        //   "and the wishlist is form the if add the product: ",
        //   wishlist
        // );
        setWishlist(uploaded);

        // setWishlist((prev) => [...prev, data.data]);
      } else {
        const updated = [...wishlist, product];
        // console.log("updated: addtowishlist: ", updated);
        setWishlist(updated);
        saveLocalWishlist(updated);
      }

      setError(null);
    } catch (err: any) {
      if (err.response?.status === 409) {
        toast.error("Already in wishlist");
      } else {
        console.error("❌ Wishlist Add Failed:", err);
        toast.error("Failed to add to wishlist");
      }
      setError("Failed to add to wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: number) => {
    setLoading(true);
    try {
      const token = getAuthToken();

      if (token) {
        await apiClient.delete(`/auth/wishlist/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWishlist((prev) => prev.filter((item) => item.id !== productId));
      } else {
        const updated = wishlist.filter((item) => item.id !== productId);
        setWishlist(updated);
        saveLocalWishlist(updated);
      }

      setError(null);
    } catch (err: any) {
      console.error("❌ removeFromWishlist error:", err);
      setError("Failed to remove from wishlist");
    } finally {
      setLoading(false);
    }
  };

  const clearWishlist = async () => {
    setLoading(true);
    try {
      const token = getAuthToken();

      if (token) {
        await apiClient.delete("/auth/wishlist/clear", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        localStorage.removeItem("wishlist");
        toast.success("[LocalStorage] Wishlist Cleared");
      }

      setWishlist([]);
      setError(null);
    } catch (err: any) {
      setError("Failed to clear wishlist");
    } finally {
      setLoading(false);
    }
  };

  const importWishlist = async (items: { product_id: number }[]) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Unauthorized");

      const { data } = await apiClient.post("/auth/wishlist/import", items, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchWishlist();
      setError(null);
      return data;
    } catch (err: any) {
      setError("Failed to import wishlist");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        fetchWishlist,
        wishlist,
        loading,
        error,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        importWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
