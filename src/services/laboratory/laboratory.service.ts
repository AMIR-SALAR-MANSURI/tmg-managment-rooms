import { z } from "@/lib/zod";
import { BaseService } from "@/services/BaseService";
import {
  AddLabRequest,
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
    return await this.get<GetLabResponse>(
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
