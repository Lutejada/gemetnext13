import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import { Equipo } from "../../api/equipos/dominio";
import { CrearEquipoDto } from "../../api/equipos/dtos/crearEquipo.dto";
import { CrearDatosMetrologicosDto } from "../../api/equipos/dtos/crearDatosMetrologicos.dto";
import { CrearDatosComplementariosDto } from "../../api/equipos/dtos/crearDatosComplementarios.dto";
import { useEquiposStore } from "@/src/app/stores/equiposStore";
import { useEffect } from "react";
import { CrearProgramacionEquipoDto } from "../../api/equipos/dtos/crearProgramation.dto";
import { EditarEquipoDto } from "../../api/equipos/dtos/editarEquipo.dto";
import { EditarDatosMetrologicosDto } from "@/app/api/equipos/dtos/editarDatosMetrologicos.dto";
import { EditarDatosComplementariosDto } from "@/app/api/equipos/dtos/editarDatosComplementarios.dto";
import { ObtenerEquiposDto } from "../types";
import { ObtenerEquiposDtoOutput } from "../../api/equipos/dtos/obtenerEquipos.dto.output";

export const useEquipos = () => {
  const { obtenerEquipos } = obtenerEquiposPorTermino();
  const store = useEquiposStore();
  useEffect(() => {
    obtenerEquipos({ page: 3 }).then((equipos) => store.addEquipos(equipos));
  }, []);

  return {
    equipos: store.equipos,
    obtenerEquipos: async (termino: string, valor: string) => {
      const equipos = await obtenerEquipos({
        termino: termino,
        valor: valor,
        page: 1,
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
  const fetcher = (url: string, { arg }: { arg?: ObtenerEquiposDto }) =>
    httpBase.get(url, { params: arg }).then((res) => res.data);
  const { data, error, isMutating, trigger } =
    useSWRMutation<ObtenerEquiposDtoOutput>("/equipos", fetcher);

  return {
    equipos: data?.equipos ?? [],
    existeSiguientePagina: data?.existeSiguientePagina ?? false,
    isLoading: isMutating,
    isError: error,
    obtenerEquipos: (args?: ObtenerEquiposDto) => trigger(args),
  };
};
export const obtenerProgramacionEquipos = () => {
  interface EquipoTermino {
    termino?: string;
    valor?: string;
    page?: number;
  }
  const fetcher = (url: string, { arg = {} }: { arg?: EquipoTermino }) =>
    httpBase.get(url, { params: arg }).then((res) => res.data);
  const { data, error, isMutating, trigger } = useSWRMutation<
    ListaProgramacionEquiposDTO[]
  >("/equipos/programar", fetcher);
  return {
    equipos: data ?? [],
    isLoading: isMutating,
    isError: error,
    obtenerEquipos: trigger,
  };
};

export const obtenerEquipoPorCodigo = (codigo: string) => {
  console.log(codigo);
  const fetcher = (url: string) =>
    httpBase.get<Equipo>(url).then((res) => res.data);
  const { data, error, isMutating, trigger } = useSWRMutation<Equipo>(
    `/equipos/${codigo}`,
    fetcher
  );
  return {
    equipo: data,
    isLoading: isMutating,
    isError: error,
    obtener: trigger,
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
export const editarEquipo = () => {
  const fetcher = (url: string, { arg }: { arg: EditarEquipoDto }) =>
    httpBase.put(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/equipos",
    fetcher
  );
  return {
    isLoading: isMutating,
    equipo: data,
    editar: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
export const editarDatosMetrologicos = () => {
  const fetcher = (url: string, { arg }: { arg: EditarDatosMetrologicosDto }) =>
    httpBase.put(url, arg).then((res) => res.data);

  const { error, trigger, isMutating } = useSWRMutation(
    "/equipos/metrologicos",
    fetcher
  );
  return {
    isLoading: isMutating,
    editar: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
export const editarDatosComplementarios = () => {
  const fetcher = (
    url: string,
    { arg }: { arg: EditarDatosComplementariosDto }
  ) => httpBase.put(url, arg).then((res) => res.data);

  const { error, trigger, isMutating } = useSWRMutation(
    "/equipos/complementarios",
    fetcher
  );
  return {
    isLoading: isMutating,
    editar: trigger,
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

export const crearProgramacionEquipo = () => {
  const fetcher = (url: string, { arg }: { arg: CrearProgramacionEquipoDto }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/equipos/programar",
    fetcher
  );

  return {
    isLoading: isMutating,
    crear: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
