import Axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { ApiResponse } from "./type";

const baseURL =
  import.meta.env.VITE_BASE_URL ||
  "https://hok-backend-6gpg.onrender.com/api/v1";

console.log("BASE URL:", baseURL);

/**
 * ✅ SINGLE GLOBAL AXIOS INSTANCE
 */
const axios: AxiosInstance = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * ✅ REQUEST INTERCEPTOR
 */
axios.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    console.log("🧠 Axios token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ AUTH HEADER SET:", config.headers.Authorization);
    } else {
      console.warn("❌ NO TOKEN FOUND");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ✅ RESPONSE INTERCEPTOR
 */
axios.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => response,
  (error: AxiosError<ApiResponse>) => {
    if (!error.response) {
      toast.error("Connection error");
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    if (status >= 500) {
      toast.error("Server error");
    } else if (status === 404) {
      toast.error("Resource not found");
    } else if (status === 401 || status === 403) {
      toast.error("Unauthorized. Please login.");
      // ❌ DO NOT delete token here
    } else {
      toast.error(data?.responseMessage || "An error occurred");
    }

    return Promise.reject(error);
  }
);

export default axios;

