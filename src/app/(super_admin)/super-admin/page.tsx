"use client";
import { useAuth } from "@/app/context/AuthContext";
import ProtectedRoute from "@/components/PrivateRoute";
import CustomBreadcrumb from "@/components/smallComponent/Breadcrumb";
// import hasRole from "@/lib/role-extr";

export default function SuperAdminPage() {
  const { user } = useAuth();
  return (
    <ProtectedRoute allowedRoles={["superadmin"]}>
      <div className=" text-center bg-white dark:bg-black text-black dark:text-white w-full h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          <CustomBreadcrumb
            items={[
              { label: "Home", link: "/" },
              { label: "Super Admin", active: true },
            ]}
          />
          <h1 className=" mt-20 text-2xl font-bold">Super Admin Page</h1>
          name: {user?.name} <br />
          email: {user?.email} <br />
          <p className=" capitalize text-purple-600 text-5xl">
            this page is comming soon...
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
