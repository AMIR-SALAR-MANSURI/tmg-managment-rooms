import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { z } from "zod";
import { ApiResponseDto } from "@/types/responseType";
import getBaseAxios, { getBaseAxiosCore } from "./baseAxios";

class BaseServiceCore {
  public async safeRequest<T>(request: () => Promise<AxiosResponse<T>>) {
    try {
      const response = await request();
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data as T;
      }

      throw error;
    }
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponseDto<T>> {
    return this.safeRequest(() =>
      getBaseAxiosCore().get<ApiResponseDto<T>>(url, config)
    );
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponseDto<T>> {
    return this.safeRequest(() =>
      getBaseAxiosCore().post<ApiResponseDto<T>>(url, data, config)
    );
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponseDto<T>> {
    return this.safeRequest(() =>
      getBaseAxiosCore().put<ApiResponseDto<T>>(url, data, config)
    );
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponseDto<T>> {
    return this.safeRequest(() =>
      getBaseAxiosCore().delete<ApiResponseDto<T>>(url, config)
    );
  }

  public buildEndpoint = ({
    url,
    values = [],
    basePath = "",
  }: {
    url: string;
    values?: (string | number)[];
    basePath?: string;
  }): string => {
    let i = 0;

    const endpoint = url.replace(/\{[^}]+\}/g, () => {
      const value = values[i++];
      return value !== undefined ? String(value) : "";
    });

    if (basePath) {
      return `${basePath.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;
    }

    return endpoint;
  };

  public getBaseURL() {
    const envURL = process.env.NEXT_PUBLIC_API_URL;

    if (!envURL || envURL === "/") {
      return "/api";
    }

    if (envURL.startsWith("http")) {
      return envURL;
    }

    if (!envURL.startsWith("/")) {
      return `/${envURL}`;
    }

    return envURL;
  }

  public static getFileSchema(props?: {
    fileSize?: number;
    mimType?: string;
    optional?: boolean;
  }) {
    return z
      .array(z.any())
      .refine((files) => props?.optional || files.length > 0, {
        message: "حداقل یک فایل باید بارگذاری شود.",
      })
      .refine(
        (files) =>
          files.every((file) => {
            if (file instanceof File)
              return file?.size <= (props?.fileSize || 15) * 1024 * 1024;

            return true;
          }),
        {
          message: "حجم هر فایل باید کمتر از 15 مگابایت باشد.",
        }
      )
      .refine(
        (files) =>
          files.every((file) => {
            if (props?.mimType)
              return (
                file instanceof File && file?.type.startsWith(props?.mimType)
              );

            return true;
          }),
        {
          message: "فقط فایل‌های تصویری مجاز هستند.",
        }
      );
  }
}

export { BaseServiceCore };
