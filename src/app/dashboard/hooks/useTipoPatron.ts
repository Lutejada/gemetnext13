import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import { TipoPatron } from "../../api/tipoPatron/dominio";
import { CrearPatronDto } from "../../api/patrones/application/dto/crearPatrones";
import useSWR from "swr";
import { CrearTipoPatronDto } from "../../api/tipoPatron/dtos/crear";

export const ObtenerTipoPatrones = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<TipoPatron[]>(
    "/tipoPatron",
    fetcher
  );
  return {
    tipoPatrones: data ?? [],
    isLoading,
    isError: error,
  };
};

export const crearTipoPatron = () => {
  const fetcher = (url: string, { arg }: { arg: CrearTipoPatronDto }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/tipoPatron",
    fetcher
  );

  return {
    isLoading: isMutating,
    tipoPatron: data,
    crear: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
