"use client";

// import { authService } from "@/auth/fn";
import { ApiResponseDto } from "@/types/responseType";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "sonner";

let baseAxiosInstance: AxiosInstance | null = null;

const getBaseAxios = (): AxiosInstance => {
  if (!window?.__CONFIG__?.baseUrl) {
    throw new Error("Env not loaded. baseUrl is missing.");
  }

  if (baseAxiosInstance) return baseAxiosInstance;

  baseAxiosInstance = axios.create({
    baseURL: window.__CONFIG__.baseUrl,
    withCredentials: true,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  });

  return baseAxiosInstance;
};

let responseInterceptorId: number | null = null;
let requestInterceptorId: number | null = null;

const baseAxiosResponseInterceptors = () => {
  if (responseInterceptorId !== null) {
    getBaseAxios().interceptors.response.eject(responseInterceptorId);
  }

  responseInterceptorId = getBaseAxios().interceptors.response.use(
    (res: AxiosResponse<ApiResponseDto<{}>>) => {
      const isSuccess = res.data.isSuccess;
      // const hasError = res.data.hasError;
      // const status = res.status;
      // const desc = res?.data?.errorDetails?.message;a

      const notify = res.config.notify;

      const message = "عملیات با موفقیت انجام شد.";

      if (notify && isSuccess) {
        toast.success(message, {
          position: "bottom-left",
        });
      }

      if (res.data?.warnings?.length) {
        const errorMessage = "لطفا با پشتیانی تماس بگیرید.";
        res.data.warnings.map((i) =>
          toast.warning(errorMessage, {
            position: "bottom-left",
            description: i,
          })
        );
      }

      return res;
    },

    function (error: AxiosError<ApiResponseDto<{}>>) {
      const status = error.status || 500;
      const response = error.response?.data;
      const message = response?.errorDetails?.message || response?.title;

      if (status > 450) {
        const errorMessage = "خطایی رخ داده است.";
        toast.error(errorMessage, {
          position: "bottom-left",
          description: message,
        });
      }

      if (status < 450) {
        const errorMessage = "لطفا با پشتیانی تماس بگیرید.";
        toast.warning(errorMessage, {
          position: "bottom-left",
          description: message,
        });
      }

      if (status === 401 || status === 403) {
        // authService().logout();
        localStorage.removeItem("token");
      }

      return Promise.reject(error);
    }
  );
};

const baseAxiosRequestInterceptors = (baseUrl: string) => {
  if (requestInterceptorId !== null) {
    getBaseAxios().interceptors.request.eject(requestInterceptorId);
  }

  requestInterceptorId = getBaseAxios().interceptors.request.use(
    (config) => {
      config.baseURL = baseUrl;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export {
  baseAxiosRequestInterceptors,
  baseAxiosResponseInterceptors,
  getBaseAxios,
};
export default getBaseAxios;
