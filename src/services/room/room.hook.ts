import { queryClient } from "@/lib/queryClient";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { ApiResponseDto } from "../../types/responseType";
import { GetAllRoomRequest } from "./room.interface";
import { RoomService } from "./room.service";

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
    queryKey: [service.basePath, service.EndPoint.roomGet, id],
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
      queryClient.invalidateQueries({
        queryKey: [service.basePath, service.EndPoint.roomGet],
        exact: false,
      });
    },
  });
};


const useAddRoomRag = () => {
  return useMutation({
    mutationFn: service.roomRag.bind(service),
    onSuccess(data: ApiResponseDto<{}>) {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [service.EndPoint.roomList],
          exact: false,
        });
    },
  });
};


const useGetRoomRagStatus = (id: string) => {
  const query = useQuery({
    queryKey: [service.basePath, service.EndPoint.roomRagStatus, id],
    queryFn: () => service.roomRagStatus(id),
    enabled: z.string().uuid().safeParse(id).success,
    select: (data) => data.data,
  });

  return {
    ...query,
  };
};


export { useAddRoom, useAddRoomRag, useEditRoom, useGetAllRoom, useGetAllRooms, useGetRoom, useGetRoomRagStatus };

