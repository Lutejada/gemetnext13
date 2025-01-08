import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import useSWR from "swr";
import { ListarProveedoresDTO } from "@/app/api/proveedor/application/dto/listarProveedore.DTO";
import { CrearProveedorDTO } from "@/app/api/proveedor/application/dto/crearProveedorDto";
import { EditarProveedorDTO } from "../../api/proveedor/application/dto/editarProveedorDTO";
import { ListarUsuriosDTO } from "@/app/api/usuarios/use-cases/dto/listarUsuarios.DTO";
import { CambiarPasswordDTO } from "@/app/api/usuarios/use-cases/dto/crearUsuario.DTO";
import { VerifyNewUserDTO } from "@/app/api/auth/dto/verifyEmailDTO";

export const useVerifyNewUser = () => {
  const fetcher = (url: string, { arg }: { arg: VerifyNewUserDTO }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/auth/verify-email",
    fetcher
  );

  return {
    isLoading: isMutating,
    response: data,
    verify: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
