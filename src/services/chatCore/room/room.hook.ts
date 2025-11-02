import { ApiResponseDto } from "@/types/responseType";
import { queryClient } from "@/lib/queryClient";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { RoomService } from "./room.service";
import {
  EditRoomRequest,
  GetAllRoomRequest,
  GetRoomRequest,
} from "./room.interface";

const service = new RoomService();

const useGetAllRoom = (filter: GetAllRoomRequest) => {
  return useInfiniteQuery({
    queryKey: [service.EndPoint.roomList, filter],
    queryFn: ({ pageParam = 0 }) =>
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
    initialPageParam: 0,
  });
};
const useGetRoom = (request: GetRoomRequest) => {
  const query = useQuery({
    queryKey: [service.EndPoint.roomGet, request.key, request.id],
    queryFn: () => service.roomGet(request),
    enabled: z.string().uuid().safeParse(request).success,
    select: (data) => data.data,
  });

  return {
    ...query,
  };
};

const useAddRoom = () => {
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

const useEditRoom = () => {
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

export { useAddRoom, useGetAllRoom, useEditRoom, useGetRoom };
