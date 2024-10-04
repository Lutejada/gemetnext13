import { CrearEjecucionDTO } from "@/app/api/ejecucion-equipo/application/dto/crearEjecucionEquipo";
import { httpBase } from "@/app/config/api-base";
import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";

export const crearEjecucionEquipo = () => {
  const fetcher = (url: string, { arg }: { arg: CrearEjecucionDTO }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/ejecucion-equipo",
    fetcher
  );

  return {
    isLoading: isMutating,
    responsable: data,
    crear: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
