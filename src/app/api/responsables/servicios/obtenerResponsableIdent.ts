import { responsableRepositorio } from "../repositorio/responsableRepositorio";

export const obtenerResponsableIdent = (identificacion: string,clienteId: string) => {
  return responsableRepositorio.obtenerResponsableIdent(identificacion,clienteId);
};
