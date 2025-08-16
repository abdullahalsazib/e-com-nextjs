import apiClient from "@/lib/api-client";


export const applyVendor = async (vendorData: {
    shop_name: string;
    address: string;
    phone: string;
    // more add 
}) => {
    const response = await apiClient.post("/vendors/apply", vendorData);
    return response;
}

export const getVendors = async () => {
    const response = await apiClient.get("/super-admin/vendors/");
    return response.data;
}

export const getVendorById = async (vendorId: string) => {
    const response = await apiClient.get(`/super-admin/vendors/${vendorId}`);
    return response.data;
}

export const approveVendor = async (vendorId: string) => {
    
  try {
    const res = await apiClient.put(`/super-admin/vendors/${String(vendorId)}/approve`);
    return res.data;
  } catch (error) {
    console.error("Error approving vendor:", error);
    throw error;
  }
};
export const rejectVendor = async (vendorId: number) => {
    const response = await apiClient.put(`/super-admin/vendors/${vendorId}/reject`);
    return response.data;
};

export const suspendVendor = async (vendorId: number) => {
    const response = await apiClient.put(`/super-admin/vendors/${vendorId}/suspend`);
    return response.data;
};