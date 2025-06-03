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

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "superadmin" | "user";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const route = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await getProfile();
      setUser(res.data.data);
    } catch (err) {
      console.error("getProfile failed:", err);
      logout();
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [fetchUser]);

  const login = useCallback(
    async (token: string) => {
      localStorage.setItem("authToken", token);
      await fetchUser();

      switch (user?.role) {
        case "admin":
          route.push("/seller");
          break;
        case "superadmin":
          route.push("/");
          break;
        default:
          route.push("/");
          break;
      }
    },
    [fetchUser, route, user?.role]
  );

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
    toast.success("Log out Successfully");
    setUser(null);
  }, []);

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
