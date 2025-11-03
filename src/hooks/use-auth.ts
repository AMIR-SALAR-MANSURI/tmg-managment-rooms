import { LoginRequest } from "@/services";
import { useLogin } from "@/services/auth/auth.hook";
import getBaseAxios from "@/services/baseAxios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuth() {
  const key = "token";

  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

  const { mutateAsync, isPending } = useLogin();

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

  const handleLogin = async (values: LoginRequest) => {
    const res = await mutateAsync(values);
    if (res) {
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
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
    isPending,
  };
}
