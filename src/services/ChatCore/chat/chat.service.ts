import { z } from "@/lib/zod";
import { BaseService } from "@/services/BaseService";
import {
  SendChatRequest,
  EditChatRequest,
  GetAllChatRequest,
  GetAllChatResponse,
  GetChatResponse,
} from "./chat.interface";
import { IDRequest } from "@/types/responseType";

export class ChatService extends BaseService {
  public readonly basePath = "/ChatsManagement";

  public EndPoint = {
    chatList: "/List",
    chatSend: "/clients/{key}/Chat/send",
    chatEdit: "/{id}/Edit",
    chatGet: "/{id}",
  };

  async ChatList(filter: GetAllChatRequest) {
    return await this.post<GetAllChatResponse[]>(
      this.buildEndpoint({
        url: this.EndPoint.chatList,
        basePath: this.basePath,
      }),
      filter
    );
  }

  async ChatGet(id: string) {
    return await this.get<GetChatResponse>(
      this.buildEndpoint({
        url: this.EndPoint.chatGet,
        basePath: this.basePath,
        values: [id],
      })
    );
  }

  async ChatSend(request: SendChatRequest) {
    return await this.post<GetAllChatResponse>(
      this.buildEndpoint({
        url: this.EndPoint.chatSend,
        basePath: this.basePath,
        values: [request.key],
      }),
      request,
      { notify: true }
    );
  }

  async ChatEdit(request: EditChatRequest & IDRequest) {
    return await this.put<GetAllChatResponse>(
      this.buildEndpoint({
        url: this.EndPoint.chatEdit,
        basePath: this.basePath,
        values: [request.id],
      }),
      request,
      { notify: true }
    );
  }

  public static Chat() {
    return z.object({
      key: z.string(),
      ChatId: z.string(),
      message: z.string(),
      conversationId: z.string().optional(),
    });
  }
}
