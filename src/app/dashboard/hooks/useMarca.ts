import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import useSWR from "swr";

import { Marca } from "../../api/marca/dominio";
import { CrearMarcaDto } from "../../api/marca/dtos/crearMarca.dto";
import { EditarMarcaDto } from "@/app/api/marca/dtos/editarMarcadto";

export const obtenerMarcas = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<Marca[]>("/marca", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    marcas: data ?? [],
    isLoading,
    isError: error,
  };
};

export const obtenerMarcasAsync = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/marca",
    fetcher
  );

  return {
    isLoading: isMutating,
    marca: data,
    obtenerMarcas: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
export const crearMarca = () => {
  const fetcher = (url: string, { arg }: { arg: CrearMarcaDto }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/marca",
    fetcher
  );

  return {
    isLoading: isMutating,
    marca: data,
    crear: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
export const editarMarca = () => {
  const fetcher = (url: string, { arg }: { arg: EditarMarcaDto }) =>
    httpBase.put(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/marca",
    fetcher
  );

  return {
    isLoading: isMutating,
    marca: data,
    editar: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
