import { httpBase } from "@/app/config/api-base";
import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { CrearEjecucionDTO } from "@/app/api/ejecucion-patron/application/dto/crearEjecucionPatron";
import { ListarEjecucionDTO } from "@/app/api/ejecucion-patron/application/dto/listarEjecucionPatrones.dto";

export const crearEjecucionPatron = () => {
  const fetcher = async (url: string, { arg }: { arg: CrearEjecucionDTO }) =>{
    const formData = new FormData();

    // Agregar los datos del DTO al FormData
    formData.append("ejecutorId", arg.ejecutorId);
    formData.append("fechaEjecucion", arg.fechaEjecucion.toString());
    formData.append("observaciones", arg.observaciones);
    formData.append("programacionPatronId", arg.programacionPatronId);

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
  }
    

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/ejecucion-patron",
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

export const obtenerEjecucionPatrones = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<ListarEjecucionDTO[]>(
    "/ejecucion-patron",
    fetcher
  );
  return {
    ejecuciones: data ?? [],
    isLoading,
    isError: error,
  };
};
