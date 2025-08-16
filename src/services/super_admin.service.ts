import apiClient from "@/lib/api-client";


export const listUsers = async () => {
  try {
    const response = await apiClient.get("/super-admin/users");
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const deleteUser = async (userId: number) => {
    try {
        const response = await apiClient.delete(`/super-admin/users/${userId}`);
        return response;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};