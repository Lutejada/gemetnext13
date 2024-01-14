import { ubicacionRepositorio } from "../repostorio/ubicacionRepositorio";

export const obtenerUbicaciones = (clienteId: string) => {
  return ubicacionRepositorio.obtenerUbicaciones(clienteId);
};
