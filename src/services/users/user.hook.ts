import { queryClient } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { ApiResponseDto } from "../../types/responseType";
import { UserService } from "./user.service";
import { GetAllUserRequest } from "./user.interface";

const service = new UserService();

const useGetAllUser = (filter: GetAllUserRequest) => {
  const query = useQuery({
    queryKey: [service.EndPoint.userList, filter],
    queryFn: () => service.userList(filter),
    select: (data) => data.data,
  });

  return {
    ...query,
  };
};

const useAddUser = () => {
  return useMutation({
    mutationFn: service.userAdd.bind(service),
    onSuccess(data: ApiResponseDto<{}>) {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [service.EndPoint.userList],
          exact: false,
        });
    },
  });
};

export { useGetAllUser, useAddUser };
