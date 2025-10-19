"use client";

import {
  baseAxiosRequestInterceptors,
  baseAxiosResponseInterceptors,
} from "@/services/baseAxios";
import { ReactNode, useEffect, useState } from "react";

interface EnvClientProviderProps {
  children: ReactNode;
}

interface Env {
  baseUrl: string;
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
      // baseAxiosResponseInterceptors();
      setEnv(data);
    }

    fetchEnv();
  }, []);

  if (!env) {
    return <>loading...</>;
  }

  return children;
}
