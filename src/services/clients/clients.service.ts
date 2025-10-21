import { z } from "@/lib/zod";
import { BaseService } from "@/services/BaseService";
import {
  AddClientsRequest,
  DeleteClientsResponse,
  EditClientsRequest,
  GetAllClientsResponse,
  GetAllClientsRequest,
} from "./clients.interface";
import { IDRequest } from "@/types/responseType";

export class ClientsService extends BaseService {
  public readonly basePath = "/ClientsManagement";

  public EndPoint = {
    clientsList: "/List",
    clientsAdd: "/Create",
    clientsEdit: "/{id}/Edit",
    clientsGet: "/{id}",
  };

  async clientsList(filter: GetAllClientsRequest) {
    return await this.post<GetAllClientsResponse[]>(
      this.buildEndpoint({
        url: this.EndPoint.clientsList,
        basePath: this.basePath,
      }),
      { params: filter }
    );
  }

  async clientsGet(id: string) {
    return await this.get<GetAllClientsResponse>(
      this.buildEndpoint({
        url: this.EndPoint.clientsGet,
        basePath: this.basePath,
        values: [id],
      })
    );
  }

  async clientsAdd(request: AddClientsRequest) {
    return await this.post<GetAllClientsResponse>(
      this.buildEndpoint({
        url: this.EndPoint.clientsAdd,
        basePath: this.basePath,
      }),
      request,
      { notify: true }
    );
  }

  async clientsEdit(request: EditClientsRequest & IDRequest) {
    return await this.put<GetAllClientsResponse>(
      this.buildEndpoint({
        url: this.EndPoint.clientsEdit,
        basePath: this.basePath,
        values: [request.id],
      }),
      request,
      { notify: true }
    );
  }

  public static clients() {
    return z.object({
      name: z.string(),
      description: z.string(),
      isDisabled: z.boolean(),
      userIds: z.array(z.string()),
    });
  }
}
