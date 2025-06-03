import apiClient from "@/lib/api-client";

export const getCategorys = async () => {
  const response = await apiClient.get("/categorys");
  return response;
};
