import { queryValuesDTO } from "@/app/api/common/types";
import { ResponseListadoEquiposProgramados } from "@/app/api/programacion-equipos/application/dto/listadoPatronesProgramados.dto";
import { httpBase } from "@/app/config/api-base";
import useSWRMutation from "swr/mutation";

export const obtenerProgramacionEquipos = () => {
  const fetcher = (url: string, { arg = {} }: { arg?: queryValuesDTO }) =>
    httpBase.get(url, { params: arg }).then((res) => res.data);
  const { data, error, isMutating, trigger } =
    useSWRMutation<ResponseListadoEquiposProgramados>(
      "/equipos/programar",
      fetcher
    );
  return {
    equipos: data,
    isLoading: isMutating,
    isError: error,
    obtenerEquipos: (args?: queryValuesDTO) => trigger(args as undefined),
  };
};
