import { z } from "zod";
import { RoomService } from "./room.service";
import { PaginationType } from "@/types/responseType";

interface RoomList {
  id: string;
  name: string;
  description: string;
  imageBase64: string;
}

interface Filter {
  pageNumber: number;
  pageSize: number;
  searchTerm: string;
  clientId: string;
}

const room = RoomService.Room();

type AddRoomRequest = z.infer<typeof room>;
type EditRoomRequest = z.infer<typeof room>;
type DeleteRoomResponse = boolean;
type GetAllRoomResponse = RoomList;
type GetAllRoomRequest = Filter & PaginationType;

export type {
  AddRoomRequest,
  DeleteRoomResponse,
  EditRoomRequest,
  GetAllRoomResponse,
  GetAllRoomRequest,
};

export type { RoomList };
