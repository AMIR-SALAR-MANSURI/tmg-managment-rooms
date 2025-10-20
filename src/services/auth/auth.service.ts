import { z } from "@/lib/zod";
import { BaseService } from "@/services/BaseService";
import { LoginRequest, LoginResponse } from "./auth.interface";

export class AuthService extends BaseService {
  public readonly basePath = "/Authentication";

  public EndPoint = {
    login: "/Login",
  };

  async login(request: LoginRequest) {
    return await this.post<LoginResponse>(
      this.buildEndpoint({
        url: this.EndPoint.login,
        basePath: this.basePath,
      }),
      request,
      { notify: true }
    );
  }

  public static Login() {
    return z.object({
      username: z.string(),
      password: z.string(),
    });
  }
}
