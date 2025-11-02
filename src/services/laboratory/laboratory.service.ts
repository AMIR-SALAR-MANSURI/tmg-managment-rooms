import { z } from "@/lib/zod";
import { BaseService } from "@/services/BaseService";
import {
  AddLabRequest,
  DeleteLabResponse,
  EditLabRequest,
  GetAllLabRequest,
  GetAllLabResponse,
  GetLabResponse,
} from "./laboratory.interface";
import { IDRequest } from "@/types/responseType";

export class LabService extends BaseService {
  public readonly basePath = "/Laboratory/chat";

  public EndPoint = {
    labList: "/list",
    labAdd: "/send",
    labMark: "/{id}/mark",
    labGet: "/{id}",
    labDelete: "/{id}/delete",
  };

  async labList(filter: GetAllLabRequest) {
    return await this.post<GetAllLabResponse[]>(
      this.buildEndpoint({
        url: this.EndPoint.labList,
        basePath: this.basePath,
      }),
      filter
    );
  }

  async labGet(id: string) {
    return await this.post<GetLabResponse>(
      this.buildEndpoint({
        url: this.EndPoint.labGet,
        basePath: this.basePath,
        values: [id],
      })
    );
  }

  async labAdd(request: AddLabRequest) {
    return await this.post<GetAllLabResponse>(
      this.buildEndpoint({
        url: this.EndPoint.labAdd,
        basePath: this.basePath,
      }),
      request,
      { notify: true }
    );
  }

  async labMark(id: string) {
    return await this.put<GetAllLabResponse>(
      this.buildEndpoint({
        url: this.EndPoint.labMark,
        basePath: this.basePath,
        values: [id],
      })
    );
  }

  async labDelete(id: string) {
    return await this.delete<DeleteLabResponse>(
      this.buildEndpoint({
        url: this.EndPoint.labDelete,
        basePath: this.basePath,
        values: [id],
      }),
      { notify: true }
    );
  }

  public static Lab() {
    return z.object({
      question: z.string(),
      systemPrompt: z.string(),
      temperature: z.number(),
      contentPrompt: z.string(),
      llmModelId: z.string(),
    });
  }
}
