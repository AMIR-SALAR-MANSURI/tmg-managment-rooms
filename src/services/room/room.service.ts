import { z } from "@/lib/zod";
import { BaseService } from "@/services/BaseService";
import {
  AddRoomRagRequest,
  AddRoomRequest,
  EditRoomRagRequest,
  EditRoomRequest,
  GetAllRagHistoryRequest,
  GetAllRagHistoryResponse,
  GetAllRoomRequest,
  GetAllRoomResponse,
  GetRoomRagRequest,
  GetRoomRagResponse,
  GetRoomRagStatus,
  GetRoomResponse,
} from "./room.interface";
import { IDRequest } from "@/types/responseType";

export class RoomService extends BaseService {
  public readonly basePath = "/RoomsManagement";

  public EndPoint = {
    roomList: "/List",
    roomAdd: "/Create",
    roomEdit: "/{id}/Edit",
    roomGet: "/{id}",
    roomRag: "/{id}/Rag",
    roomRagStatus: '/{id}/Rag/status',
    roomRagList: "/{id}/Prompt/List",
    roomRagGet: '/{id}/Prompt/{promptId}',
    roomRagEdit: '/{id}/Prompt/{promptId}/Edit'
  };

  async roomList(filter: GetAllRoomRequest) {
    return await this.post<GetAllRoomResponse[]>(
      this.buildEndpoint({
        url: this.EndPoint.roomList,
        basePath: this.basePath,
      }),
      filter
    );
  }

  async roomGet(id: string) {
    return await this.get<GetRoomResponse>(
      this.buildEndpoint({
        url: this.EndPoint.roomGet,
        basePath: this.basePath,
        values: [id],
      })
    );
  }

  async roomAdd(request: AddRoomRequest) {
    return await this.post<GetAllRoomResponse>(
      this.buildEndpoint({
        url: this.EndPoint.roomAdd,
        basePath: this.basePath,
      }),
      request,
      {
        notify: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  async roomEdit(request: EditRoomRequest & IDRequest) {
    return await this.put<GetAllRoomResponse>(
      this.buildEndpoint({
        url: this.EndPoint.roomEdit,
        basePath: this.basePath,
        values: [request.id],
      }),
      request,
      {
        notify: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  async roomRag(request: AddRoomRagRequest & IDRequest) {
    return await this.post<{}>(
      this.buildEndpoint({
        url: this.EndPoint.roomRag,
        basePath: this.basePath,
        values: [request.id]
      }),
      request,
      {
        notify: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  async roomRagStatus(id: string) {
    return await this.get<GetRoomRagStatus>(
      this.buildEndpoint({
        url: this.EndPoint.roomRagStatus,
        basePath: this.basePath,
        values: [id],
      })
    );
  }


  async roomGetRagHistory(request: GetAllRagHistoryRequest) {
    return await this.get<GetAllRagHistoryResponse[]>(
      this.buildEndpoint({
        url: this.EndPoint.roomRagList,
        basePath: this.basePath,
        values: [request.id],
      })
    );
  }
  async roomGetRag(request: GetRoomRagRequest) {
    return await this.get<GetRoomRagResponse>(
      this.buildEndpoint({
        url: this.EndPoint.roomRagGet,
        basePath: this.basePath,
        values: [request.id, request.promptId],
      })
    );
  }

  async roomRagEdit(request: EditRoomRagRequest & GetRoomRagRequest) {
    return await this.put<{}>(
      this.buildEndpoint({
        url: this.EndPoint.roomRagEdit,
        basePath: this.basePath,
        values: [request.id, request.promptId],
      }),
      request,
      {
        notify: true,
      }
    );
  }

  public static Room() {
    return z.object({
      clientId: z.string(),
      name: z.string(),
      description: z.string(),
      systemPrompt: z.string(),
      ImageFile: z.any(),
      contentPrompt: z.string(),
      llmModelId: z.string(),
    });
  }

  public static RoomRag() {
    return z.object({
      File: z.any(),
      Knowledge: z.string(),
      SystemPrompt: z.string(),
      SmallTalkPrompt: z.string(),
      RAGParameters: z.number()
    })
  }

  public static RoomRagEdit() {
    return z.object({
      systemPrompt: z.string(),
      smallTalkPrompt: z.string(),
      isActive: z.boolean(),
      temperature: z.number().optional()
    })
  }
}
