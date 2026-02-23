import { z } from "zod";
import { RoomService } from "./room.service";
import { IDRequest, PaginationType } from "@/types/responseType";

interface RoomList {
  id: string;
  name: string;
  description: string;
  imageData: {
    imageBase64: string;
    imageContentType: string;
    imageExtension: string;
  };
}

interface Filter {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  clientId?: string;
  returnAll?: boolean;
}

interface GetRoom {
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

interface RagHistoryList {
  id: string,
  roomId: string,
  systemPrompt: string,
  contentPrompt: string,
  smallTalkPrompt: string,
  versionNumber: number,
  temperature: number,
  isActive: boolean,
  createdAt: string
}

interface RoomRagStatus {
  roomId: string,
  roomName: string,
  ragStartedAt: string,
  ragFinishedAt: string,
  ragProgressPercentage: string,
  ragLastError: string,
  roomStatus: string,
  jobId: string
}

interface RoomRagGet {
  promptId: string,
  roomId: string,
  temperature: number,
  currentVersion: number,
  createdAt: string,
  systemPrompt: string,
  systemPromptHistory:
  {
    id: string,
    version: number,
    value: string
  }[],
  smallTalkPrompt: string,
  smallTalkPromptHistory:
  {
    id: string,
    version: number,
    value: string
  }[],
  contentPrompt: string,
  isActive: boolean
}

export enum RagParameter {
  MS_WORD_TEXT = 0,
  MS_WORD_PARAGRAPH = 1
}

const room = RoomService.Room();

const rag = RoomService.RoomRag();

const ragEdit = RoomService.RoomRagEdit()


type AddRoomRequest = z.infer<typeof room>;
type EditRoomRequest = z.infer<typeof room>;
type AddRoomRagRequest = z.infer<typeof rag>;
type EditRoomRagRequest = z.infer<typeof ragEdit>;

type DeleteRoomResponse = boolean;
type GetAllRoomResponse = RoomList;
type GetAllRoomRequest = Filter & PaginationType;
type GetRoomResponse = GetRoom;
type GetRoomRagStatus = RoomRagStatus
type GetAllRagHistoryResponse = RagHistoryList
type GetAllRagHistoryRequest = IDRequest
type GetRoomRagResponse = RoomRagGet
type GetRoomRagRequest = { promptId: string } & IDRequest





export type {
  AddRoomRequest,
  DeleteRoomResponse,
  EditRoomRequest,
  GetAllRoomResponse,
  GetAllRoomRequest,
  GetRoomResponse,
  AddRoomRagRequest,
  GetRoomRagStatus,
  GetAllRagHistoryResponse,
  GetAllRagHistoryRequest,
  GetRoomRagResponse,
  GetRoomRagRequest,
  EditRoomRagRequest
};

export type { RoomList, RagHistoryList };
