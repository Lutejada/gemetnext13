import  { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import useSWR from "swr";
import { Actividad } from "../../api/actividad/dominio";
import { CrearActividadDto } from "../../api/actividad/dtos/crear";

export const obtenerActividades = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<Actividad[]>(
    "/actividad",
    fetcher
  );
  return {
    responsables: data ?? [],
    isLoading,
    isError: error,
  };
};


export const crearActividad = () => {

  const fetcher = (
    url: string,
    { arg }: { arg: CrearActividadDto }
  ) => httpBase.post(url, arg).then((res) => res.data);


  const { data, error, trigger, isMutating } = useSWRMutation(
    "/actividad",
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
