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

const room = RoomService.Room();

type AddRoomRequest = z.infer<typeof room>;
type EditRoomRequest = z.infer<typeof room>;
type DeleteRoomResponse = boolean;
type GetAllRoomResponse = RoomList;
type GetAllRoomRequest = Filter & PaginationType;
type GetRoomResponse = GetRoom;

export type {
  AddRoomRequest,
  DeleteRoomResponse,
  EditRoomRequest,
  GetAllRoomResponse,
  GetAllRoomRequest,
  GetRoomResponse,
};

export type { RoomList };
