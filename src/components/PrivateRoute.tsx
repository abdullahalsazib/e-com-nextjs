/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../app/context/AuthContext";

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
      } else if (
        allowedRoles &&
        !user.roles?.some((role) => allowedRoles.includes(role.slug as any))
      ) {
        router.push("/unauthorized"); // Create this page
      }
    }
  }, [user, isLoading, allowedRoles, router]);

  if (isLoading || !user) return null;

  if (
    !allowedRoles ||
    user.roles?.some((role) => allowedRoles.includes(role.slug as any))
  ) {
    return <>{children}</>;
  }

  return null;
};

export default PrivateRoute;
