import { responsableRepositorio } from "../repositorio/responsableRepositorio";

export const obtenerResponsables = async (clienteId: string) => {
  return responsableRepositorio.obtenerResponsables(clienteId);
};
