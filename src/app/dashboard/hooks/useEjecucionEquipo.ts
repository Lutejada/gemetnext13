import { CrearEjecucionDTO } from "@/app/api/ejecucion-equipo/application/dto/crearEjecucionEquipo";
import { ListarEjecucionDTO } from "@/app/api/ejecucion-equipo/application/dto/listarEjecucionEquipos.dto";
import { httpBase } from "@/app/config/api-base";
import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { createFormData } from "@/lib/helpers/formData";

export const useCrearEjecucionEquipo = () => {
  const fetcher = async (url: string, { arg }: { arg: CrearEjecucionDTO }) => {
    const formData = createFormData(arg);
    const response = await httpBase.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/ejecucion-equipo",
    fetcher
  );

  return {
    isLoading: isMutating,
    responsable: data,
    crear: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};

export const useObtenerEjecucionEquipos = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<ListarEjecucionDTO[]>(
    "/ejecucion-equipo",
    fetcher
  );
  return {
    ejecuciones: data ?? [],
    isLoading,
    isError: error,
  };
};
