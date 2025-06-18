"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { getProfile } from "@/services/auth.service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useWishlist } from "./WishlistContext";

interface User {
  ID: string;
  name: string;
  email: string;
  role: "admin" | "superadmin" | "user";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchWishlist } = useWishlist();

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return null;
    }

    try {
      setIsLoading(true);
      const res = await getProfile();
      setUser(res.data.data);
      return res.data.data; // Return user data
    } catch (err) {
      console.error("getProfile failed:", err);
      localStorage.removeItem("authToken");
      setUser(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          await fetchUser();
        } catch {
          // Error already handled in fetchUser
          console.log("error form authcontext");
        }
      } else {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, [fetchUser]);

  const login = useCallback(
    async (token: string) => {
      try {
        localStorage.setItem("authToken", token);

        const userData = await fetchUser();

        const redirectPath = userData?.role === "admin" ? "/seller" : "/";
        router.push(redirectPath);
        await fetchWishlist();
        // setTimeout(() => {
        //   window.location.reload();
        // }, 100); // delay ensures router.push completes

        // setTimeout(() => window.location.reload(), 100);
        toast.success("Login successful");
      } catch (error) {
        toast.error("Login failed");
        throw error;
      }
    },
    [fetchUser, router]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/");
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
