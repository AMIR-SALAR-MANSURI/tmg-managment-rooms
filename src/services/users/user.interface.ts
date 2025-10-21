import { z } from "zod";
import { UserService } from "./user.service";
import { PaginationType } from "@/types/responseType";

interface LlmList {
  id: string;
  username: string;
  name: string;
  email: string;
  mobile: string;
  userRoles: [string];
}

interface Filter {
  pageSize?: number;
  pageNumber?: number;
  clientId?: string;
}

const user = UserService.UserModels();

type AddUserRequest = z.infer<typeof user>;
type EditUserRequest = z.infer<typeof user>;
type DeleteUserResponse = boolean;
type GetAllUserResponse = LlmList;
type GetAllUserRequest = Filter & PaginationType;

export type {
  AddUserRequest,
  DeleteUserResponse,
  EditUserRequest,
  GetAllUserRequest,
  GetAllUserResponse,
};
