import { z } from "zod";
import { ClientsService } from "./clients.service";
import { PaginationType } from "@/types/responseType";

interface ClientsList {
  id: string;
  name: string;
  description: string;
  isDisabled: boolean;
  userIds: [string];
}

interface Clients {
  id: string;
  name: string;
  description: string;
  isDisabled: boolean;
  userIds: [string];
}

interface Filter {
  searchTerm?: string;
  clientId?: string;
  returnAll?: boolean;
}

const clients = ClientsService.clients();

type AddClientsRequest = z.infer<typeof clients>;
type EditClientsRequest = z.infer<typeof clients>;
type DeleteClientsResponse = boolean;
type GetAllClientsResponse = ClientsList;
type GetAllClientsRequest = Filter & PaginationType;
type GetClientsResponse = Clients;

export type {
  AddClientsRequest,
  DeleteClientsResponse,
  EditClientsRequest,
  GetAllClientsResponse,
  GetAllClientsRequest,
  GetClientsResponse,
};

export type { ClientsList };
