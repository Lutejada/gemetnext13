import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import { Equipo } from "../../api/equipos/dominio";
import { CrearEquipoDto } from "../../api/equipos/application/dtos/crearEquipo.dto";
import { CrearDatosMetrologicosDto } from "../../api/equipos/application/dtos/crearDatosMetrologicos.dto";
import { CrearDatosComplementariosDto } from "../../api/equipos/application/dtos/crearDatosComplementarios.dto";

import { CrearProgramacionEquipoDto } from "../../api/equipos/application/dtos/crearProgramation.dto";
import { EditarEquipoDto } from "../../api/equipos/application/dtos/editarEquipo.dto";
import { EditarDatosMetrologicosDto } from "@/app/api/equipos/application/dtos/editarDatosMetrologicos.dto";
import { EditarDatosComplementariosDto } from "@/app/api/equipos/application/dtos/editarDatosComplementarios.dto";

import { ObtenerEquiposDtoOutput } from "../../api/equipos/application/dtos/obtenerEquipos.dto.output";
import { EquipoProgramacionDto } from "@/app/api/equipos/application/dtos/listaProgramacionEquipos.output";
import { ObtenerDatosDto } from "@/app/api/common/types";

export const obtenerEquiposPorTermino = () => {
  const fetcher = (url: string, { arg }: { arg?: ObtenerDatosDto }) =>
    httpBase.get(url, { params: arg }).then((res) => res.data);
  const { data, error, isMutating, trigger } =
    useSWRMutation<ObtenerEquiposDtoOutput>("/equipos", fetcher);

  return {
    equipos: data?.equipos ?? [],
    existeSiguientePagina: data?.existeSiguientePagina ?? false,
    isLoading: isMutating,
    isError: error,
    obtenerEquipos: (args?: ObtenerDatosDto) => trigger(args as undefined),
  };
};
export const obtenerProgramacionEquipos = () => {
  const fetcher = (url: string, { arg = {} }: { arg?: ObtenerDatosDto }) =>
    httpBase.get(url, { params: arg }).then((res) => res.data);
  const { data, error, isMutating, trigger } = useSWRMutation<
    EquipoProgramacionDto[]
  >("/equipos/programar", fetcher);
  return {
    equipos: data ?? [],
    isLoading: isMutating,
    isError: error,
    obtenerEquipos: (args?: ObtenerDatosDto) => trigger(args as undefined),
    //existeSiguientePagina: data?.existeSiguientePagina ?? false,
  };
};
// export const obtenerProgramacionEquipos = () => {
//   const fetcher = (url: string, { arg = {} }: { arg?: ObtenerDatosDto }) =>
//     httpBase.get(url, { params: arg }).then((res) => res.data);
//   const { data, error, isMutating, trigger } =
//     useSWRMutation<ListaProgramacionEquiposDTO>("/equipos/programar", fetcher);
//   return {
//     equipos: data?.equiposProgramados ?? [],
//     isLoading: isMutating,
//     isError: error,
//     obtenerEquipos: (args?: ObtenerDatosDto) => trigger(args as undefined),
//     existeSiguientePagina: data?.existeSiguientePagina ?? false,
//   };
// };

export const obtenerEquipoPorCodigo = (codigo: string) => {
  const fetcher = (url: string) =>
    httpBase.get<Equipo>(url).then((res) => res.data);
  const { data, error, isMutating, trigger } = useSWRMutation<Equipo>(
    `/equipos/${codigo}`,
    fetcher
  );
  return {
    equipo: data,
    isLoading: isMutating,
    isError: error,
    obtener: trigger,
  };
};

export const crearEquipo = () => {
  const fetcher = (url: string, { arg }: { arg: CrearEquipoDto }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/equipos",
    fetcher
  );
  return {
    isLoading: isMutating,
    equipo: data,
    crear: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
export const editarEquipo = () => {
  const fetcher = (url: string, { arg }: { arg: EditarEquipoDto }) =>
    httpBase.put(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/equipos",
    fetcher
  );
  return {
    isLoading: isMutating,
    equipo: data,
    editar: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
export const editarDatosMetrologicos = () => {
  const fetcher = (url: string, { arg }: { arg: EditarDatosMetrologicosDto }) =>
    httpBase.put(url, arg).then((res) => res.data);

  const { error, trigger, isMutating } = useSWRMutation(
    "/equipos/metrologicos",
    fetcher
  );
  return {
    isLoading: isMutating,
    editar: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
export const editarDatosComplementarios = () => {
  const fetcher = (
    url: string,
    { arg }: { arg: EditarDatosComplementariosDto }
  ) => httpBase.put(url, arg).then((res) => res.data);

  const { error, trigger, isMutating } = useSWRMutation(
    "/equipos/complementarios",
    fetcher
  );
  return {
    isLoading: isMutating,
    editar: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};

export const crearDatosMetrologicos = () => {
  const fetcher = (url: string, { arg }: { arg: CrearDatosMetrologicosDto }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/equipos/metrologicos",
    fetcher
  );

  return {
    isLoading: isMutating,
    metrologicos: data,
    crear: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
export const crearDatosComplementarios = () => {
  const fetcher = (
    url: string,
    { arg }: { arg: CrearDatosComplementariosDto }
  ) => httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/equipos/complementarios",
    fetcher
  );

  return {
    isLoading: isMutating,
    metrologicos: data,
    crear: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};

export const crearProgramacionEquipo = () => {
  const fetcher = (url: string, { arg }: { arg: CrearProgramacionEquipoDto }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/equipos/programar",
    fetcher
  );

  return {
    isLoading: isMutating,
    crear: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
