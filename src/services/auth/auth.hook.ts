import { ApiResponseDto } from "@/types/responseType";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "./auth.service";
import { queryClient } from "@/lib/queryClient";
import { LoginResponse } from "./auth.interface";

const service = new AuthService();

const useLogin = () => {
  return useMutation({
    mutationFn: service.login.bind(service),
    onSuccess(data: ApiResponseDto<LoginResponse>) {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [service.EndPoint.login],
          exact: false,
        });
    },
  });
};

export { useLogin };
