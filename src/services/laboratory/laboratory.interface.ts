import { z } from "zod";
import { LabService } from "./laboratory.service";
import { PaginationType } from "@/types/responseType";

interface LabList {
  id: string;
  question: string;
  response: string;
  isMarked: boolean;
  createdAt: string;
  llmModel: {
    id: string;
    name: string;
    nameFa: string;
    description: string;
    extendedData: string;
    isDisabled: boolean;
    queueServiceName: string;
  };
  temperature: number;
}

interface Filter {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  returnAll?: boolean;
}

interface GetLab {
  id: string;
  isMarked: boolean;
  createdAt: string;
  systemPrompt: string;
  contentPrompt: string;
  question: string;
  response: string;
  temperature: number;
  llmModel: {
    id: string;
    name: string;
    nameFa: string;
    description: string;
    extendedData: string;
    isDisabled: boolean;
    queueServiceName: string;
  };
}

const Lab = LabService.Lab();

type AddLabRequest = z.infer<typeof Lab>;
type EditLabRequest = z.infer<typeof Lab>;
type DeleteLabResponse = boolean;
type GetAllLabResponse = LabList;
type GetAllLabRequest = Filter & PaginationType;
type GetLabResponse = GetLab;

export type {
  AddLabRequest,
  DeleteLabResponse,
  EditLabRequest,
  GetAllLabResponse,
  GetAllLabRequest,
  GetLabResponse,
};

export type { LabList };
