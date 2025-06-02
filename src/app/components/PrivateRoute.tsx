"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("user" | "admin" | "superadmin")[]; // optional
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push("/unauthorized"); // You must create this page
      }
    }
  }, [user, isLoading, allowedRoles, router]);

  if (isLoading || !user) return null;

  // If user is allowed or no role restriction
  if (!allowedRoles || allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  return null;
};

export default PrivateRoute;
