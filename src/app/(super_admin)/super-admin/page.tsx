import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function SuperAdminPage() {
  return (
    <ProtectedRoute allowedRoles={["superadmin"]}>
      <div>Welcome SuperAdmin</div>
    </ProtectedRoute>
  );
}
