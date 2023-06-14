import { responsableRepositorio } from "../repositorio/responsableRepositorio";

export const obtenerResponsableIdent = (identificacion: string) => {
  return responsableRepositorio.obtenerResponsableIdent(identificacion);
};
