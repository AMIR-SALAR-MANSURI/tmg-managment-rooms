import { usePagination } from "@/hooks/use-pagination";
import { queryClient } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponseDto } from "../../types/responseType";
import { GetAllClientsRequest } from "./clients.interface";
import { ClientsService } from "./clients.service";
import z from "zod";

const service = new ClientsService();

const useGetAllClients = (filter: GetAllClientsRequest) => {
  const { pagination } = usePagination();

  const query = useQuery({
    queryKey: [service.basePath, service.EndPoint.clientsList, filter, pagination],
    queryFn: () =>
      service.clientsList({
        ...filter,
        ...pagination,
      }),
  });
  return {
    ...query,
    ...pagination,
  };
};
const useGetClients = (id: string) => {
  const query = useQuery({
    queryKey: [service.EndPoint.clientsGet, id],
    queryFn: () => service.clientsGet(id),
    enabled: z.string().uuid().safeParse(id).success,

    select: (data) => data.data,
  });

  return {
    ...query,
  };
};

const useAddClients = () => {
  return useMutation({
    mutationFn: service.clientsAdd.bind(service),
    onSuccess(data: ApiResponseDto<{}>) {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [service.basePath, service.EndPoint.clientsList],
          exact: false,
        });
    },
  });
};

const useEditClients = () => {
  return useMutation({
    mutationFn: service.clientsEdit.bind(service),
    onSuccess(data: ApiResponseDto<{}>) {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [service.basePath, service.EndPoint.clientsList],
          exact: false,
        });
    },
  });
};

export { useAddClients, useEditClients, useGetAllClients, useGetClients };
