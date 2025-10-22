import { z } from "@/lib/zod";
import { BaseService } from "@/services/BaseService";
import {
  AddRoomRequest,
  EditRoomRequest,
  GetAllRoomRequest,
  GetAllRoomResponse,
} from "./room.interface";
import { IDRequest } from "@/types/responseType";

export class RoomService extends BaseService {
  public readonly basePath = "/RoomsManagement";

  public EndPoint = {
    roomList: "/List",
    roomAdd: "/Create",
    roomEdit: "/{id}/Edit",
    roomGet: "/{id}",
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
    return await this.get<GetAllRoomResponse>(
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
      { notify: true }
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
      { notify: true }
    );
  }

  public static Room() {
    return z.object({
      clientId: z.string(),
      name: z.string(),
      description: z.string(),
      systemPrompt: z.string(),
      imageBase64: z.string(),
      contentPrompt: z.string(),
      llmModelId: z.string(),
    });
  }
}
