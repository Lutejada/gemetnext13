import { actividadRepositorio } from "../repositorio/actividadRepositorio";

export const obtenerActividades = (clienteId: string) => {
  return actividadRepositorio.obtenerActividades(clienteId);
};
