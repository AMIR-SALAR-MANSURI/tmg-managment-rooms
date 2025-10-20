import { queryClient } from "@/lib/queryClient";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { ApiResponseDto, IDRequest } from "../../types/responseType";
import { RoomService } from "./room.service";
import { EditRoomRequest, GetAllRoomRequest } from "./room.interface";

const service = new RoomService();

const useGetAllLlm = (filter: GetAllRoomRequest) => {
  return useInfiniteQuery({
    queryKey: [service.EndPoint.roomList, filter],
    queryFn: ({ pageParam = 1 }) =>
      service.roomList({
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
const useGetLlm = (id: string) => {
  const query = useQuery({
    queryKey: [service.EndPoint.roomGet, id],
    queryFn: () => service.roomGet(id),
    select: (data) => data.data,
  });

  return {
    ...query,
  };
};

const useAddLlm = () => {
  return useMutation({
    mutationFn: service.roomAdd.bind(service),
    onSuccess(data: ApiResponseDto<{}>) {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [service.EndPoint.roomList],
          exact: false,
        });
    },
  });
};

const useEditLlm = () => {
  return useMutation({
    mutationFn: service.roomEdit.bind(service),
    onSuccess(data: ApiResponseDto<{}>) {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [service.EndPoint.roomList],
          exact: false,
        });
    },
  });
};

export { useAddLlm, useGetAllLlm, useEditLlm, useGetLlm };
