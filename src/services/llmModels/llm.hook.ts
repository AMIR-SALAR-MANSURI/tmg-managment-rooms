import { queryClient } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { ApiResponseDto } from "../../types/responseType";
import { LlmService } from "./llm.service";

const service = new LlmService();

const useGetAllLlm = () => {
  const query = useQuery({
    queryKey: [service.basePath, service.EndPoint.llmList],
    queryFn: () => service.llmList(),
    select: (data) => data.data,
  });

  return {
    ...query,
  };
};

const useAddLlm = () => {
  return useMutation({
    mutationFn: service.llmAdd.bind(service),
    onSuccess(data: ApiResponseDto<{}>) {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [service.basePath, service.EndPoint.llmList],
          exact: false,
        });
    },
  });
};

export { useAddLlm, useGetAllLlm };
