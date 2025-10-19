import { BaseService } from "@/services/BaseService";
import { IDRequest } from "@/types/responseType";
import { z } from "@/lib/zod";
import {
  AddTargetRequest,
  DeleteTargetResponse,
  EditTargetRequest,
  GetAllTargetListResponse,
  ParamsTarget,
} from "./target.interface";

export class TargetService extends BaseService {
  public readonly basePath = "/Task";

  public EndPoint = {
    targetGet: "/{id}/Target/{tId}",
    targetList: "/{id}/Target/List",
    targetAdd: "/{id}/Target/Add",
    targetDelete: "/{id}/Target/{tId}/Delete",
    targetEdit: "/{id}/Target/{tId}/Edit",
  };

  async TargetGet(params: ParamsTarget) {
    return await this.get<GetAllTargetListResponse>(
      this.buildEndpoint({
        url: this.EndPoint.targetGet,
        basePath: this.basePath,
        values: [params.id, params.tId],
      })
    );
  }

  async TargetList(id: string) {
    return await this.post<GetAllTargetListResponse[]>(
      this.buildEndpoint({
        url: this.EndPoint.targetList,
        basePath: this.basePath,
        values: [id],
      })
    );
  }

  async targetAdd(request: AddTargetRequest & IDRequest) {
    return await this.post<GetAllTargetListResponse>(
      this.buildEndpoint({
        url: this.EndPoint.targetAdd,
        basePath: this.basePath,
        values: [request.id],
      }),
      request,
      { notify: true }
    );
  }

  async targetEdit(request: EditTargetRequest & ParamsTarget) {
    return await this.put<GetAllTargetListResponse>(
      this.buildEndpoint({
        url: this.EndPoint.targetEdit,
        basePath: this.basePath,
        values: [request.id, request.tId],
      }),
      request,
      { notify: true }
    );
  }

  async targetDelete(request: ParamsTarget) {
    return await this.delete<DeleteTargetResponse>(
      this.buildEndpoint({
        url: this.EndPoint.targetDelete,
        basePath: this.basePath,
        values: [request.id, request.tId],
      }),
      { notify: true }
    );
  }

  public static Target() {
    return z.object({
      title: z.string(),
      unit: z.string(),
      isPositive: z.boolean(),
      baseYear: z.number(),
      year1403: z.number(),
      year1404: z.number(),
      year1405: z.number(),
      year1406: z.number(),
      year1407: z.number(),
      weight: z.number(),
      finalPercentage: z.number(),
    });
  }
}
