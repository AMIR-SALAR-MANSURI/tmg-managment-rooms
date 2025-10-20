import z from "zod";
import { AuthService } from "./auth.service";

const Login = AuthService.Login();

type LoginRequest = z.infer<typeof Login>;

interface CheckResponse {
  isSuccess: boolean;
  message: string;
  data: { token: string; expiration: string };
}

type LoginResponse = { token: string; expiration: string };

export type { CheckResponse, LoginRequest, LoginResponse };
