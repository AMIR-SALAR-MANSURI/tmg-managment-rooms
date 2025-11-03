import { z } from "zod";
import { PaginationType } from "@/types/responseType";
import { ChatService } from "./chat.service";

interface TChat {
  id: string;
  title: string;
  createdAt: string;
  isArchived: boolean;
  isPinnedToTop: boolean;
  messages: [
    {
      role: string;
      content: string;
    }
  ];
}

interface Filter {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  clientId?: string;
}

interface GetChat {
  id: string;
  name: string;
  description: string;
  clientId: string;
  systemPrompt: string;
  contentPrompt: string;
  llmModelId: string;
  imageFile: {
    imageBase64: string;
    imageContentType: string;
    imageExtension: string;
  };
}

const chat = ChatService.Chat();

type SendChatRequest = z.infer<typeof chat>;
type EditChatRequest = z.infer<typeof chat>;
type DeleteChatResponse = boolean;
type GetAllChatResponse = TChat;
type GetAllChatRequest = Filter & PaginationType;
type GetChatResponse = GetChat;

export type {
  SendChatRequest,
  DeleteChatResponse,
  EditChatRequest,
  GetAllChatResponse,
  GetAllChatRequest,
  GetChatResponse,
};

export type { TChat };
