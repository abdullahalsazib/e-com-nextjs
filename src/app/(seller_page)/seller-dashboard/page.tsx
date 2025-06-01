"use client";
import { useAuth } from "@/app/context/AuthContext";

const SellerPage = () => {
  const auth = useAuth();

  if (!auth || auth.isLoading) {
    return <h1>Loading ...</h1>;
  }

  const { user } = auth;
  console.log("form seller deshboard: ", user);
  return (
    <>
      {/* <ProtectedRoute allowedRoles={["admin"]}> */}
      <div>
        <h1> user name: {user?.name}</h1>
        <h1> user role: {user?.role}</h1>
        <h1>This is Seller page</h1>
      </div>
      {/* </ProtectedRoute> */}
    </>
  );
};

export default SellerPage;
