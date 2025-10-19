import { ApiResponseDto } from "./../../types/responseType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ParamsTarget } from "./target.interface";
import { TargetService } from "./target.service";
import { queryClient } from "@/lib/queryClient";
import { z } from "zod";

const service = new TargetService();

const useGetTarget = (params: ParamsTarget) => {
  const query = useQuery({
    queryKey: [service.EndPoint.targetGet, params],
    queryFn: () => service.TargetGet(params),
    enabled: z
      .object({
        id: z.string().uuid(),
        tId: z.string(),
      })
      .safeParse(params).success,
    select: (data) => data.data,
  });

  return {
    ...query,
  };
};

const useGetAllTarget = (id: string) => {
  const query = useQuery({
    queryKey: [service.EndPoint.targetList, id],
    queryFn: () => service.TargetList(id),
    enabled: z.string().uuid().safeParse(id).success,
    select: (data) => data.data,
  });

  return {
    ...query,
  };
};

const useAddTarget = () => {
  return useMutation({
    mutationFn: service.targetAdd.bind(service),
    onSuccess(data: ApiResponseDto<{}>) {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [service.EndPoint.targetList],
          exact: false,
        });
    },
  });
};

const useEditTarget = () => {
  return useMutation({
    mutationFn: service.targetEdit.bind(service),
    onSuccess(data: ApiResponseDto<{}>) {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [service.EndPoint.targetList],
          exact: false,
        });
    },
  });
};

const useDeleteTarget = () => {
  return useMutation({
    mutationFn: service.targetDelete.bind(service),
    onSuccess(data: ApiResponseDto<{}>) {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [service.EndPoint.targetList],
          exact: false,
        });
    },
  });
};

export {
  useAddTarget,
  useDeleteTarget,
  useGetAllTarget,
  useGetTarget,
  useEditTarget,
};
