import { queryClient } from "@/lib/queryClient";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { ApiResponseDto, IDRequest } from "../../types/responseType";
import { LabService } from "./laboratory.service";
import {
  GetAllLabRequest,
  GetAllLabResponse,
  LabList,
} from "./laboratory.interface";
import { usePagination } from "@/hooks/use-pagination";

const service = new LabService();

const useGetAllLab = (filter: GetAllLabRequest) => {
  const { pagination } = usePagination();

  const query = useQuery({
    queryKey: [service.EndPoint.labList, filter, pagination],
    queryFn: () =>
      service.labList({
        ...filter,
        ...pagination,
      }),
  });
  return {
    ...query,
    ...pagination,
  };
};
const useGetLab = (id: string) => {
  const query = useQuery({
    queryKey: [service.EndPoint.labGet, id],
    queryFn: () => service.labGet(id),
    enabled: z.string().uuid().safeParse(id).success,
    select: (data) => data.data,
  });

  return {
    ...query,
  };
};

const useAddLab = () => {
  return useMutation({
    mutationFn: service.labAdd.bind(service),
    onSuccess(data: ApiResponseDto<LabList>) {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [service.EndPoint.labList],
          exact: false,
        });
    },
  });
};

const useMarkLab = () => {
  return useMutation({
    mutationFn: service.labMark.bind(service),
    onSuccess(data: ApiResponseDto<{}>) {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [service.EndPoint.labList],
          exact: false,
        });
    },
  });
};

export { useAddLab, useGetAllLab, useMarkLab, useGetLab };
