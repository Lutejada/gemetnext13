import  { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { Responsable } from "../types";
import { httpBase } from "../../config/api-base";
import useSWR, { mutate } from "swr";

import { CrearResponsableDto } from "../../api/responsables/dtos/crearResponsable.dto";

export const obtenerResponsables = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<Responsable[]>(
    "/responsables",
    fetcher
  );
  return {
    responsables: data ?? [],
    isLoading,
    isError: error,
  };
};


export const crearResponsable = () => {

  const fetcher = (
    url: string,
    { arg }: { arg: CrearResponsableDto }
  ) => httpBase.post(url, arg).then((res) => res.data);


  const { data, error, trigger, isMutating } = useSWRMutation(
    "/responsables",
    fetcher
  );

  return {
    isLoading: isMutating,
    responsable: data,
    crear:trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
