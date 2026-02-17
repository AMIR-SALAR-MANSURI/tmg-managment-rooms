import { LoginRequest } from "@/services";
import { useLogin } from "@/services/auth/auth.hook";
import getBaseAxios from "@/services/baseAxios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


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
    if (res.isSuccess) {
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      router.push(process.env.NEXT_PUBLIC_BASE_PATH as string);
      setAxiosAuthHeader();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
    setToken(null);
    window.location.reload();
  };


  type JwtPayload = {
    role?: string;
    roles?: string[];
    exp?: number;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string
  };

  function getUserRoleFromToken() {
    if (typeof window === "undefined") return null;

    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      return decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    } catch (error) {
      console.error("Invalid JWT", error);
      return null;
    }
  }
  return {
    token,
    handleLogin,
    handleLogout,
    isPending,
    getUserRoleFromToken
  };
}
