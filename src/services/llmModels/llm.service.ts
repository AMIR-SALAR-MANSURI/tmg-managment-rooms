import { z } from "@/lib/zod";
import { BaseService } from "@/services/BaseService";
import { AddLlmRequest, GetAllLlmResponse } from "./llm.interface";

export class LlmService extends BaseService {
  public readonly basePath = "/ModelsManagement";

  public EndPoint = {
    llmList: "/List",
    llmAdd: "/Create",
  };

  async llmList() {
    return await this.get<GetAllLlmResponse[]>(
      this.buildEndpoint({
        url: this.EndPoint.llmList,
        basePath: this.basePath,
      })
    );
  }

  async llmAdd(request: AddLlmRequest) {
    return await this.post<GetAllLlmResponse>(
      this.buildEndpoint({
        url: this.EndPoint.llmAdd,
        basePath: this.basePath,
      }),
      request,
      { notify: true }
    );
  }

  public static LlmModels() {
    return z.object({
      name: z.string(),
      nameFa: z.string(),
      description: z.string(),
      extendedData: z.string(),
    });
  }
}
