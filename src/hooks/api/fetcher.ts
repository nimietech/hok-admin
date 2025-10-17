

import { useEffect } from "react";
import { AxiosError } from "axios";
import useSWR, { SWRResponse } from "swr";
import { ApiResponse } from "./type";
import { useAxios } from "./axios";
import { toast } from "react-hot-toast";

export const useFetcher = (
  url?: string | null,
  params?: Record<string, any>,
  hideToast?: boolean
): SWRResponse<ApiResponse, AxiosError> => {
  const { axios } = useAxios();

  const fetcher = async (url: string) => {
    const res = await axios.get<ApiResponse>(url, { params });
    console.log("➡️ Request Headers:", res.config?.headers);
    return res.data;
  };

  const { data, isValidating, isLoading, error, mutate } = useSWR<
    ApiResponse,
    AxiosError<ApiResponse>
  >(url || null, fetcher, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
    shouldRetryOnError: true,
    errorRetryCount: 3,
    errorRetryInterval: 30000,
  });

  useEffect(() => {
    if (hideToast) return;
    if (error) {
      const messages =
        error.response?.data?.responseMessage ??
        "An error occurred while fetching data";

      const errorMessages = Array.isArray(messages)
        ? messages
        : messages.split(",").map((m) => m.trim());

      for (const message of errorMessages) {
        if (message) toast.error(message);
      }
    }
  }, [error, hideToast]);

  useEffect(() => {
    if (hideToast) return;
    if (!data?.data && !isLoading && data?.responseMessage) {
      toast.error(data.responseMessage);
    }
  }, [data, hideToast, isLoading]);

  return {
    data,
    mutate,
    error,
    isValidating,
    isLoading,
  };
};
