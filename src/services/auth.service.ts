import apiClient from "@/lib/api-client";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await apiClient.post("/register", userData);
  return response;
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await apiClient.post("/login", credentials);
  return response;
};

export const getProfile = async () => {
  const response = await apiClient.get("/auth/me");
  return response;
};
