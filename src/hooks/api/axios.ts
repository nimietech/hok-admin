"use client";

import { useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import Axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { ApiResponse } from "./type";

export const baseURL = import.meta.env.VITE_BASE_URL || "";

export const useAxios = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const axios = useMemo<AxiosInstance>(() => {
    const axiosInstance = Axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    axiosInstance.interceptors.request.use(
      async (config) => {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>): AxiosResponse<ApiResponse> => {
        setLoading(false);
        return response;
      },
      async (error: AxiosError<ApiResponse>) => {
        setLoading(false);

        if (!error.response) {
          toast.error("Connection error");
          throw error;
        }

        const { status, data } = error.response;

        if (status >= 500) {
          toast.error("An unknown server error occurred");
        } else if (status === 404) {
          toast.error("Resource not found");
        } else if (status === 401 || status === 403) {
          toast.error("Unauthorized access, please login again");
          sessionStorage.clear();
        } else {
          toast.error(data?.responseMessage || "An error occurred");
        }

        throw error;
      }
    );

    return axiosInstance;
  }, []);

  return { axios, loading };
};
