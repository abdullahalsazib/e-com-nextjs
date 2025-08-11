// src/lib/api-client.ts
import axios, { AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
// https://e-com-backend-next-js.onrender.com
// http://localhost:8080

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined in environment variables"
  );
}

axios.defaults.withCredentials = true;
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});
// Request interceptor for adding auth token

apiClient.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: any) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default apiClient;
