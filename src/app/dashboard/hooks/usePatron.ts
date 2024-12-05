import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import { CrearPatronDto } from "../../api/patrones/application/dto/crearPatrones";
import { Patron } from "../../api/patrones/dominio";
import { CrearDatosMetrologicosDto } from "../../api/patrones/dtos/crearDatosMetrologicos";
import { CrearDatosComplementariosDto } from "../../api/patrones/dtos/crearDatosComplementarios.dto";
import { ObtenerPatronesDtoOutput } from "@/app/api/patrones/dtos/obtenerPatrones.dto.output";
import { queryValuesDTO } from "@/app/api/common/types";
import { EditarBasicosDto } from "../../api/patrones/dtos/editarBasicos.dto";
import { EditarDatosMetrologicosDto } from "@/app/api/patrones/dtos/editarDatosMetrologicos.dto";
import { EditarDatosComplementariosDto } from "@/app/api/patrones/dtos/editarDatosComplementarios.dto";
import { CrearProgramacionPatronDto } from "../../api/patrones/dtos/crearProgramation.dto";
import { PatronInformacionBasicaDTO } from "@/app/api/patrones/application/dto/obtenerPatrones";
import { ResponseListadoPaginado } from "@/app/api/common/dto/listadoPaginado";
import { createFormData } from "@/lib/helpers/formData";

export const useCrearPatron = () => {
  const fetcher = async (url: string, { arg }: { arg: CrearPatronDto }) => {
    const formData = createFormData(arg);
    const response = await httpBase.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/patrones",
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

export const crearDatosMetrologicos = () => {
  const fetcher = (url: string, { arg }: { arg: CrearDatosMetrologicosDto }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/patrones/metrologicos",
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
    "/patrones/complementarios",
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

export const listarPatrones = () => {
  const fetcher = (url: string, { arg }: { arg?: queryValuesDTO }) =>
    httpBase.get(url, { params: arg }).then((res) => res.data);
  const { data, error, isMutating, trigger } = useSWRMutation<
    ResponseListadoPaginado<PatronInformacionBasicaDTO>
  >("/patrones", fetcher);
  return {
    patrones: data?.data ?? [],
    isLoading: isMutating,
    isError: error,
    obtenerPatrones: (args?: queryValuesDTO) => trigger(args as undefined),
    existeSiguientePagina: data?.existePaginaSiguiente ?? false,
  };
};

export const obtenerPatronPorCodigo = (codigo: string) => {
  const fetcher = (url: string) =>
    httpBase.get<Patron>(url).then((res) => res.data);
  const { data, error, isMutating, trigger } = useSWRMutation<Patron>(
    `/patrones/${codigo}`,
    fetcher
  );
  return {
    patron: data,
    isLoading: isMutating,
    isError: error,
    obtener: trigger,
  };
};

export const editarDatosBasicos = () => {
  const fetcher = (url: string, { arg }: { arg: EditarBasicosDto }) =>
    httpBase.put(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/patrones",
    fetcher
  );
  return {
    isLoading: isMutating,
    patrones: data,
    editar: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};

export const editarDatosMetrologicos = () => {
  const fetcher = (url: string, { arg }: { arg: EditarDatosMetrologicosDto }) =>
    httpBase.put(url, arg).then((res) => res.data);

  const { error, trigger, isMutating } = useSWRMutation(
    "/patrones/metrologicos",
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
    "/patrones/complementarios",
    fetcher
  );
  return {
    isLoading: isMutating,
    editar: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};

export const crearProgramacionPatron = () => {
  const fetcher = (url: string, { arg }: { arg: CrearProgramacionPatronDto }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/patrones/programar",
    fetcher
  );

  return {
    isLoading: isMutating,
    crear: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
