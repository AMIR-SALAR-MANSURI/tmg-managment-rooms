import { queryClient } from "@/lib/queryClient";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { ApiResponseDto, IDRequest } from "../../types/responseType";
import { RoomService } from "./room.service";
import { EditRoomRequest, GetAllRoomRequest } from "./room.interface";

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

const useGetAllRooms = (filter: GetAllRoomRequest) => {
  const query = useQuery({
    queryKey: [service.EndPoint.roomGet, filter],
    queryFn: () => service.roomList(filter),
    select: (data) => data.data,
  });

  return {
    ...query,
  };
};
const useGetRoom = (id: string) => {
  const query = useQuery({
    queryKey: [service.EndPoint.roomGet, id],
    queryFn: () => service.roomGet(id),
    enabled: z.string().uuid().safeParse(id).success,
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

export { useAddRoom, useGetAllRoom, useEditRoom, useGetRoom, useGetAllRooms };
