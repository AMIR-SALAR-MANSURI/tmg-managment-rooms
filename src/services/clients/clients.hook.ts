import { queryClient } from "@/lib/queryClient";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { ApiResponseDto, IDRequest } from "../../types/responseType";
import { ClientsService } from "./clients.service";
import { GetAllClientsRequest } from "./clients.interface";

const service = new ClientsService();

const useGetAllClients = (filter: GetAllClientsRequest) => {
  return useInfiniteQuery({
    queryKey: [service.EndPoint.clientsList, filter],
    queryFn: ({ pageParam = 1 }) =>
      service.clientsList({
        ...filter,
        pageNumber: pageParam,
        pageSize: filter?.pageSize || 12,
      }),
    getNextPageParam: ({ pagingMetaData }) => {
      // if (pagingMetaData && pagingMetaData. < pagingMetaData?.hasPrevious) {
      return pagingMetaData?.currentPage + 1;
      // }
      // return undefined;
    },
    initialPageParam: 1,
  });
};
const useGetClients = (id: string) => {
  const query = useQuery({
    queryKey: [service.EndPoint.clientsGet, id],
    queryFn: () => service.clientsGet(id),
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
          queryKey: [service.EndPoint.clientsList],
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
          queryKey: [service.EndPoint.clientsList],
          exact: false,
        });
    },
  });
};

export { useAddClients, useGetAllClients, useEditClients, useGetClients };
