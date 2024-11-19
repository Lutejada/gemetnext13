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

import {
  EquipoInformacionBasicaDTO,
  ObtenerEquiposDtoOutput,
} from "../../api/equipos/application/dtos/obtenerEquipos.dto.output";
import { queryValuesDTO } from "@/app/api/common/types";
import { EquipoProgramacionDto } from "@/app/api/programacion-equipos/application/dto/listadoPatronesProgramados.dto";
import { ResponseListadoPaginado } from "@/app/api/common/dto/listadoPaginado";

export const listarEquipos = () => {
  const fetcher = (url: string, { arg }: { arg?: queryValuesDTO }) =>
    httpBase.get(url, { params: arg }).then((res) => res.data);
  const { data, error, isMutating, trigger } = useSWRMutation<
    ResponseListadoPaginado<EquipoInformacionBasicaDTO>
  >("/equipos", fetcher);

  return {
    equipos: data?.data ?? [],
    existeSiguientePagina: data?.existePaginaSiguiente ?? false,
    isLoading: isMutating,
    isError: error,
    obtenerEquipos: (args?: queryValuesDTO) => trigger(args as undefined),
  };
};

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
