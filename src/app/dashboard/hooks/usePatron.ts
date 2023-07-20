import  { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import useSWR from "swr";
import { CrearPatronDto } from "../../api/patrones/dtos/crear";
import { Patron } from "../../api/patrones/dominio";

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
