// apiService.js
import { env } from "@/services/env";
import axios from "axios";

const BASE_URL = env.VITE_PUBLIC_API_URL; // Replace with your API base URL

const apiService = axios.create({
  baseURL: BASE_URL,
  //   timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

// Interceptors (optional): You can use interceptors to handle requests or responses globally.

// Request interceptor
apiService.interceptors.request.use(
  async (config: any) => {
    // You can modify the request config here (e.g., add headers)
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiService.interceptors.response.use(
  (response: any) => {
    // You can modify the response data here
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default apiService;
