import { queryClient } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { ApiResponseDto } from "../../types/responseType";
import { UserService } from "./user.service";

const service = new UserService();

const useGetAllUser = () => {
  const query = useQuery({
    queryKey: [service.basePath],
    queryFn: () => service.userList(),
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
