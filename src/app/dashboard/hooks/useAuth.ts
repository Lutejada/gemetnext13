import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import { changePasswordDTO } from "@/app/api/auth/dto/changePasswordDTO";

export const useChangePassword = () => {
  const fetcher = (url: string, { arg }: { arg: changePasswordDTO }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/auth/change-password",
    fetcher
  );

  return {
    isLoading: isMutating,
    response: data,
    change: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
