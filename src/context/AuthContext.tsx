/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import apiClient from "@/lib/api-client";
import { getProfile } from "@/services/auth.service";
import { toast } from "sonner";
import { useWishlist } from "./WishlistContext";

interface User {
  id: string;
  name: string;
  email: string;
  roles: { id: number; name: string; slug: string }[];
  vendor: { vendor_name: string; vendor_status: string } | null;
}

interface DecodedToken {
  user_id: number;
  email: string;
  roles: string[];
  exp: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasRole: (roles: string[]) => boolean;
  login: (access_token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [decodedRoles, setDecodedRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchWishlist } = useWishlist();

  const decodeToken = useCallback(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getProfile();
      setUser(res.data);
      return res.data;
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
      setIsLoading(true);
      try {
        // Refresh token cookie theke backend new access token debe
        const res = await apiClient.post("/refresh");
        const newAccessToken = res.data.access_token;

        if (newAccessToken) {
          localStorage.setItem("authToken", newAccessToken);
          const decoded = decodeToken();
          setDecodedRoles(decoded?.roles || []);
          await fetchUser();
          await fetchWishlist();
        }
      } catch (error) {
        localStorage.removeItem("authToken");
        setUser(null);
        setDecodedRoles([]);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(
    async (access_token: string) => {
      setIsLoading(true);
      const startTime = Date.now();
      try {
        localStorage.setItem("authToken", access_token);

        const decoded = decodeToken();
        setDecodedRoles(decoded?.roles || []);

        const userData = await fetchUser();
        if (!userData) throw new Error("No user data");

        await fetchWishlist();
      } catch (error) {
        toast.error("Login failed from authContext", {
          position: "top-center",
        });
        throw error;
      } finally {
        const elapsed = Date.now() - startTime;
        const minDelay = 5000; // 5s
        const remaining = minDelay - elapsed;

        if (remaining > 0) {
          setTimeout(() => setIsLoading(false), remaining);
        } else {
          setIsLoading(false);
        }
      }
    },
    [decodeToken, fetchUser, fetchWishlist]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    const startTime = Date.now();
    try {
      await apiClient.post("/logout");
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      localStorage.removeItem("authToken"); // access token remove
      setUser(null);
      setDecodedRoles([]);
      const elapsed = Date.now() - startTime;
      const minDelay = 2000; // 2s
      const remaining = minDelay - elapsed;

      if (remaining > 0) {
        setTimeout(() => setIsLoading(false), remaining);
      } else {
        setIsLoading(false);
      }
      toast.info("Logged out successfully", {
        position: "top-center",
      });
      // router.push("/login");
    }
  }, []);

  const hasRole = useCallback(
    (roles: string[]) => {
      if (!decodedRoles.length) return false;
      return roles.some((role) => decodedRoles.includes(role));
    },
    [decodedRoles]
  );

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      hasRole,
      login,
      logout,
    }),
    [user, isLoading, hasRole, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
