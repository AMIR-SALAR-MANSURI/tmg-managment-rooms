import { z } from "zod";
import { RoomService } from "./room.service";
import { PaginationType } from "@/types/responseType";

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

export enum RagParameter {
  MS_WORD_TEXT = 0,
  MS_WORD_PARAGRAPH = 1
}

const room = RoomService.Room();

const rag = RoomService.RoomRag();


type AddRoomRequest = z.infer<typeof room>;
type EditRoomRequest = z.infer<typeof room>;
type AddRoomRagRequest = z.infer<typeof rag>;
type DeleteRoomResponse = boolean;
type GetAllRoomResponse = RoomList;
type GetAllRoomRequest = Filter & PaginationType;
type GetRoomResponse = GetRoom;
type GetRoomRagStatus = RoomRagStatus




export type {
  AddRoomRequest,
  DeleteRoomResponse,
  EditRoomRequest,
  GetAllRoomResponse,
  GetAllRoomRequest,
  GetRoomResponse,
  AddRoomRagRequest,
  GetRoomRagStatus
};

export type { RoomList };
