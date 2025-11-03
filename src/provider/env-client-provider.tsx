"use client";
import {
  baseAxiosRequestInterceptors,
  baseAxiosRequestInterceptorsCore,
  baseAxiosResponseInterceptors,
} from "@/services/baseAxios";
import { ReactNode, useEffect, useState } from "react";

interface EnvClientProviderProps {
  children: ReactNode;
}

interface Env {
  baseUrl: string;
  chatUrl: string;
}

declare global {
  interface Window {
    __CONFIG__?: Env;
  }
}

export default function EnvClientProvider({
  children,
}: EnvClientProviderProps) {
  const [env, setEnv] = useState<Env | null>(null);

  useEffect(() => {
    async function fetchEnv() {
      const res = await fetch("/api/front/env");
      const data = await res.json();
      window.__CONFIG__ = data;
      baseAxiosRequestInterceptors(window.__CONFIG__?.baseUrl as string);
      baseAxiosRequestInterceptorsCore(window.__CONFIG__?.chatUrl as string);

      baseAxiosResponseInterceptors();
      setEnv(data);
    }

    fetchEnv();
  }, []);

  if (!env) {
    return (
      <>
        {" "}
        <div className="flex flex-col justify-center items-center w-full h-dvh space-y-8">
          <div className="w-10 h-10 animate-spin rounded-full border-dashed border-8 border-primary"></div>
          <span>درحال دریافت اطلاعات...</span>
        </div>
      </>
    );
  }

  return children;
}
