import { z } from "@/lib/zod";
import { BaseService } from "@/services/BaseService";
import {
  AddUserRequest,
  DeleteUserResponse,
  EditUserRequest,
  GetAllUserRequest,
  GetAllUserResponse,
} from "./user.interface";

export class UserService extends BaseService {
  public readonly basePath = "/UsersManagement";

  public EndPoint = {
    userList: "/List",
    userAdd: "/Create",
  };

  async userList(filter: GetAllUserRequest) {
    return await this.post<GetAllUserResponse[]>(
      this.buildEndpoint({
        url: this.EndPoint.userList,
        basePath: this.basePath,
      }),
      filter
    );
  }

  async userAdd(request: AddUserRequest) {
    return await this.post<GetAllUserResponse>(
      this.buildEndpoint({
        url: this.EndPoint.userAdd,
        basePath: this.basePath,
      }),
      request,
      { notify: true }
    );
  }

  public static UserModels() {
    return z.object({
      name: z.string(),
      nameFa: z.string(),
      description: z.string(),
      extendedData: z.string(),
    });
  }
}
