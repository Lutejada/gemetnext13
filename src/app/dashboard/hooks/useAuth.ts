import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import { ChangePasswordDTO } from "@/app/api/auth/dto/changePasswordDTO";
import { ForgotPasswordDTO } from "@/app/api/auth/dto/forgotPasswordDTO";

export const useChangePassword = () => {
  const fetcher = (url: string, { arg }: { arg: ChangePasswordDTO }) =>
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

export const useForgotPassword = () => {
  const fetcher = (url: string, { arg }: { arg: ForgotPasswordDTO }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/auth/forgot-password",
    fetcher
  );

  return {
    isLoading: isMutating,
    response: data,
    send: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
