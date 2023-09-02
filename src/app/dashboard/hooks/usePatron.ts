import  { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import useSWR from "swr";
import { CrearPatronDto } from "../../api/patrones/dtos/crearPatrones";
import { Patron } from "../../api/patrones/dominio";
import { CrearDatosMetrologicosDto } from "../../api/patrones/dtos/crearDatosMetrologicos";
import { CrearDatosComplementariosDto } from "../../api/patrones/dtos/crearDatosComplementarios.dto";

export const obtenerPatrones = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<Patron[]>(
    "/patrones",
    fetcher
  );
  return {
    equipos: data ?? [],
    isLoading,
    isError: error,
  };
};


export const crearPatron = () => {

  const fetcher = (
    url: string,
    { arg }: { arg: CrearPatronDto }
  ) => httpBase.post(url, arg).then((res) => res.data);


  const { data, error, trigger, isMutating } = useSWRMutation(
    "/patrones",
    fetcher
  );

  return {
    isLoading: isMutating,
    equipo: data,
    crear:trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};

export const crearDatosMetrologicos = () => {

  const fetcher = (
    url: string,
    { arg }: { arg: CrearDatosMetrologicosDto }
  ) => httpBase.post(url, arg).then((res) => res.data);


  const { data, error, trigger, isMutating } = useSWRMutation(
    "/patrones/metrologicos",
    fetcher
  );

  return {
    isLoading: isMutating,
    metrologicos: data,
    crear:trigger,
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
    crear:trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
