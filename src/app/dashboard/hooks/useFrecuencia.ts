import  { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import useSWR from "swr";
import { Actividad } from "../../api/actividad/dominio";
import { CrearActividadDto } from "../../api/actividad/dtos/crear";
import { Frecuencia } from "../../api/frecuencia/dominio";
import { CrearFrecuenciaDto } from "../../api/frecuencia/dtos/crear";

export const obtenerFrecuencias = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<Frecuencia[]>(
    "/frecuencia",
    fetcher
  );
  return {
    responsables: data ?? [],
    isLoading,
    isError: error,
  };
};


export const crearFrecuencia = () => {

  const fetcher = (
    url: string,
    { arg }: { arg: CrearFrecuenciaDto }
  ) => httpBase.post(url, arg).then((res) => res.data);


  const { data, error, trigger, isMutating } = useSWRMutation(
    "/frecuencia",
    fetcher
  );

  return {
    isLoading: isMutating,
    actividad: data,
    crear:trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
