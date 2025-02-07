import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import useSWR from "swr";
import { ListarUsuriosDTO } from "@/app/api/usuarios/use-cases/dto/listarUsuarios.DTO";
import { CrearUsuarioDTO } from "@/app/api/usuarios/use-cases/dto/crearUsuario.DTO";
import { Role } from "@/app/api/usuarios/dominio/entity";

interface ListarUsuariosQuery {
  roles?: Role[];
}
export const useListadoUsuarios = (arg?: ListarUsuariosQuery) => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const roles = arg?.roles;
  const queryParams = roles
    ? roles.map((role) => `role=${role}`).join("&")
    : "";
  const { data, error, isLoading } = useSWR<ListarUsuriosDTO[]>(
    `/usuarios${queryParams ? `?${queryParams}` : ""}`,
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
    error,
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
  const fetcher = (url: string, { arg }: { arg: CrearUsuarioDTO }) =>
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
