import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import useSWR from "swr";
import { CrearMarcaDto } from "../../api/marca/dtos/crearMarca.dto";
import { EditarMarcaDto } from "@/app/api/marca/dtos/editarMarcadto";
import { ListarProveedoresDTO } from "@/app/api/proveedor/application/dto/listarProveedore.DTO";
import { CrearProveedorDTO } from "@/app/api/proveedor/application/dto/crearProveedorDto";

export const useListadoProvedores = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<ListarProveedoresDTO[]>(
    "/proveedor",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    proveedores: data ?? [],
    isLoading,
    isError: error,
  };
};

export const useObtenerProveedores = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/proveedor",
    fetcher
  );

  return {
    isLoading: isMutating,
    marca: data,
    obtenerProveedor: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
export const useCrearProveedor = () => {
  const fetcher = (url: string, { arg }: { arg: CrearProveedorDTO }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/proveedor",
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
