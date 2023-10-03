import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import useSWR from "swr";
import { Equipo } from "../../api/equipos/dominio";
import { CrearEquipoDto } from "../../api/equipos/dtos/crearEquipo.dto";
import { CrearDatosMetrologicosDto } from "../../api/equipos/dtos/crearDatosMetrologicos.dto";
import { CrearDatosComplementariosDto } from "../../api/equipos/dtos/crearDatosComplementarios.dto";
import { useEquiposStore } from "@/src/app/stores/equiposStore";
import { useEffect } from "react";

export const useEquipos = () => {
  const { obtenerEquipos } = obtenerEquiposPorTermino();
  const store = useEquiposStore();
  useEffect(() => {
    obtenerEquipos({}).then((equipos) => store.addEquipos(equipos));
  }, []);

  return {
    equipos: store.equipos,
    obtenerEquipos: async (termino: string, valor: string) => {
      const equipos = await obtenerEquipos({
        termino: termino,
        valor: valor,
      });
      store.addEquipos(equipos);
    },
  };
};

// export const obtenerEquipos = () => {
//   const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
//   const { data, error, isLoading } = useSWR<Equipo[]>("/equipos", fetcher);
//   return {
//     equipos: data ?? [],
//     isLoading,
//     isError: error,
//   };
// };

export const obtenerEquiposPorTermino = () => {
  interface EquipoTermino {
    termino?: string;
    valor?: string;
  }
  const fetcher = (url: string, { arg }: { arg?: EquipoTermino }) =>
    httpBase.get(url, { params: arg }).then((res) => res.data);
  const { data, error, isMutating, trigger } = useSWRMutation(
    "/equipos",
    fetcher
  );
  return {
    equipos: data ?? [],
    isLoading: isMutating,
    isError: error,
    obtenerEquipos: trigger,
  };
};

export const crearEquipo = () => {
  const fetcher = (url: string, { arg }: { arg: CrearEquipoDto }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/equipos",
    fetcher
  );
  return {
    isLoading: isMutating,
    equipo: data,
    crear: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};

export const crearDatosMetrologicos = () => {
  const fetcher = (url: string, { arg }: { arg: CrearDatosMetrologicosDto }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/equipos/metrologicos",
    fetcher
  );

  return {
    isLoading: isMutating,
    metrologicos: data,
    crear: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
export const crearDatosComplementarios = () => {
  const fetcher = (
    url: string,
    { arg }: { arg: CrearDatosComplementariosDto }
  ) => httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/equipos/complementarios",
    fetcher
  );

  return {
    isLoading: isMutating,
    metrologicos: data,
    crear: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
