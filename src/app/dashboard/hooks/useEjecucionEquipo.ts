import { CrearEjecucionDTO } from "@/app/api/ejecucion-equipo/application/dto/crearEjecucionEquipo";
import { ListarEjecucionDTO } from "@/app/api/ejecucion-equipo/application/dto/listarEjecucionEquipos.dto";
import { httpBase } from "@/app/config/api-base";
import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

export const crearEjecucionEquipo = () => {
  const fetcher = async (url: string, { arg }: { arg: CrearEjecucionDTO }) => {
    const formData = new FormData();

    // Agregar los datos del DTO al FormData
    formData.append("ejecutorId", arg.ejecutorId);
    formData.append("fechaEjecucion", arg.fechaEjecucion.toString());
    formData.append("observaciones", arg.observaciones);
    formData.append("programacionEquipoId", arg.programacionEquipoId);

    // Agregar los archivos al FormData
    if (arg.archivos) {
      for (let i = 0; i < arg.archivos.length; i++) {
        formData.append("archivos", arg.archivos[i]);
      }
    }

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

export const obtenerEjecucionEquipos = () => {
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
