// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProfile } from "@/services/auth.service";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await getProfile();
      setUser(res.data.data);
    } catch (err) {
      console.error("getProfile failed:", err);
      logout(); // Clear token and user
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchUser(); // Only if token exists
    } else {
      setIsLoading(false); // No user, but loading complete
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("authToken", token);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isLoading, login, logout }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
