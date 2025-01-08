import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import useSWR from "swr";
import { ListarProveedoresDTO } from "@/app/api/proveedor_temp/application/dto/listarProveedore.DTO";
import { CrearProveedorDTO } from "@/app/api/proveedor_temp/application/dto/crearProveedorDto";
import { EditarProveedorDTO } from "../../api/proveedor_temp/application/dto/editarProveedorDTO";
import { ListarUsuriosDTO } from "@/app/api/usuarios/use-cases/dto/listarUsuarios.DTO";
import { CambiarPasswordDTO } from "@/app/api/usuarios/use-cases/dto/crearUsuario.DTO";

export const useListadoUsuarios = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<ListarUsuriosDTO[]>(
    "/usuarios",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    usuarios: data ?? [],
    isLoading,
    isError: error,
  };
};

export const useObtenerUsuarios = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/usuarios",
    fetcher
  );

  return {
    isLoading: isMutating,
    marca: data,
    obtenerUsuario: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
export const useCrearUsuario = () => {
  const fetcher = (url: string, { arg }: { arg: CambiarPasswordDTO }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/usuarios",
    fetcher
  );

  return {
    isLoading: isMutating,
    usuario: data,
    crear: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
