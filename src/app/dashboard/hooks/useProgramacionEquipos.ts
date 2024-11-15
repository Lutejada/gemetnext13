import { ObtenerDatosDto } from "@/app/api/common/types";
import { ResponseListadoPatronesProgramados } from "@/app/api/programacion-equipos/application/dto/listadoPatronesProgramados.dto";
import { httpBase } from "@/app/config/api-base";
import useSWRMutation from "swr/mutation";

export const obtenerProgramacionEquipos = () => {
  const fetcher = (url: string, { arg = {} }: { arg?: ObtenerDatosDto }) =>
    httpBase.get(url, { params: arg }).then((res) => res.data);
  const { data, error, isMutating, trigger } =
    useSWRMutation<ResponseListadoPatronesProgramados>(
      "/equipos/programar",
      fetcher
    );
  return {
    equipos: data,
    isLoading: isMutating,
    isError: error,
    obtenerEquipos: (args?: ObtenerDatosDto) => trigger(args as undefined),
  };
};
