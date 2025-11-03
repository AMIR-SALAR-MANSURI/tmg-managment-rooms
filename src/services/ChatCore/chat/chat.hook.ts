import { queryClient } from "@/lib/queryClient";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { ApiResponseDto, IDRequest } from "./../../../types/responseType";
import { GetAllChatRequest } from "./chat.interface";
import { ChatService } from "./chat.service";

const service = new ChatService();

const useGetAllChat = (filter: GetAllChatRequest) => {
  return useInfiniteQuery({
    queryKey: [service.EndPoint.chatList, filter],
    queryFn: ({ pageParam = 0 }) =>
      service.ChatList({
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
const useGetChat = (id: string) => {
  const query = useQuery({
    queryKey: [service.EndPoint.chatGet, id],
    queryFn: () => service.ChatGet(id),
    enabled: z.string().uuid().safeParse(id).success,
    select: (data) => data.data,
  });

  return {
    ...query,
  };
};

const useAddChat = () => {
  return useMutation({
    mutationFn: service.ChatSend.bind(service),
    onSuccess(data: ApiResponseDto<{}>) {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [service.EndPoint.chatList],
          exact: false,
        });
    },
  });
};

const useEditChat = () => {
  return useMutation({
    mutationFn: service.ChatEdit.bind(service),
    onSuccess(data: ApiResponseDto<{}>) {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [service.EndPoint.chatList],
          exact: false,
        });
    },
  });
};

export { useAddChat, useGetAllChat, useEditChat, useGetChat };
