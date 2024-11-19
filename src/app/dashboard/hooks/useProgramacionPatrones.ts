import { queryValuesDTO } from "@/app/api/common/types";
import { ResponseListadoPatronesProgramados } from "@/app/api/programacion-patrones/application/dto/listadoPatronesProgramados.dto";
import { httpBase } from "@/app/config/api-base";
import useSWRMutation from "swr/mutation";

export const obtenerProgramacionPatrones = () => {
  const fetcher = (url: string, { arg = {} }: { arg?: queryValuesDTO }) =>
    httpBase.get(url, { params: arg }).then((res) => res.data);
  const { data, error, isMutating, trigger } =
    useSWRMutation<ResponseListadoPatronesProgramados>(
      "/patrones/programar",
      fetcher
    );
  return {
    patrones: data,
    isLoading: isMutating,
    isError: error,
    obtenerPatrones: (args?: queryValuesDTO) => trigger(args as undefined),
  };
};
