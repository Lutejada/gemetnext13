import { frecuenciaRepositorio } from "../repositorio/frecuenciaResposito";

export const obtenerfrecuencias = (clienteId: string) => {
  return frecuenciaRepositorio.obtenerFrecuencias(clienteId);
};
