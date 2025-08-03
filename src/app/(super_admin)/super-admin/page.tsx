import ProtectedRoute from "@/components/PrivateRoute";

export default function SuperAdminPage() {
  return (
    <ProtectedRoute allowedRoles={["superadmin"]}>
      <div>Welcome SuperAdmin</div>
    </ProtectedRoute>
  );
}
