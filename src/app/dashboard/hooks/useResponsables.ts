import  { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { Responsable } from "../types";
import { httpBase } from "../../config/api-base";
import useSWR, { mutate } from "swr";
export const useResponsables = () => {
  return {
    obtenerResponsables,
    crearResponsable,
  };
};

export const obtenerResponsables = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<Responsable[]>(
    "/responsables",
    fetcher
  );
  return {
    responsables: data,
    isLoading,
    isError: error,
  };
};

// export const crearResponsable = async (responsable: any) => {
//   const res = await httpBase.post("/responsables", responsable );
//   return {
//     responsable: res.data,
//   };
// };
export const crearResponsable = () => {
  const fetcher = (
    url: string,
    { arg }: { arg: { nombre: string; alias: string } }
  ) => httpBase.post(url, arg).then((res) => res.data);
  const { data, error, trigger, isMutating } = useSWRMutation(
    "/responsables",
    fetcher
  );
  return {
    isLoading: isMutating,
    responsable: data,
    trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
