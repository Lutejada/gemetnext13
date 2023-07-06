import  { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import useSWR from "swr";

import { Marca } from "../../api/marca/dominio";
import { CrearMarcaDto } from "../../api/marca/dtos/crearMarca.dto";

export const obtenerMarcas = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<Marca[]>(
    "/marca",
    fetcher
  );
  return {
    marcas: data ?? [],
    isLoading,
    isError: error,
  };
};


export const crearMarca = () => {

  const fetcher = (
    url: string,
    { arg }: { arg: CrearMarcaDto }
  ) => httpBase.post(url, arg).then((res) => res.data);


  const { data, error, trigger, isMutating } = useSWRMutation(
    "/marca",
    fetcher
  );

  return {
    isLoading: isMutating,
    marca: data,
    crear:trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
