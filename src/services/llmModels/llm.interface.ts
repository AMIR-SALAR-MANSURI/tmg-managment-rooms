import { z } from "zod";
import { LlmService } from "./llm.service";

interface LlmList {
  id: string;
  name: string;
  nameFa: string;
  description: string;
  extendedData: string;
  isDisabled: boolean;
}

const llm = LlmService.LlmModels();

type AddLlmRequest = z.infer<typeof llm>;
type EditLlmRequest = z.infer<typeof llm>;
type DeleteLlmResponse = boolean;
type GetAllLlmResponse = LlmList;

export type {
  AddLlmRequest,
  DeleteLlmResponse,
  EditLlmRequest,
  GetAllLlmResponse,
};
