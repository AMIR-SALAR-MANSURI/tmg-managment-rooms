import getBaseAxios from "@/services/baseAxios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuth() {
  const key = "token";

  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem(key);
    if (savedToken) {
      setToken(savedToken);
      setAxiosAuthHeader();
    }
  }, []);

  const setAxiosAuthHeader = () => {
    getBaseAxios().interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (!config.headers["Authorization"] && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  };

  const handleLogin = async (values: "") => {
    // const res = await mutateAsync(values);
    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
      router.push("/");
      setAxiosAuthHeader();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
    setToken(null);
    window.location.reload();
  };

  return {
    token,
    handleLogin,
    handleLogout,
  };
}
