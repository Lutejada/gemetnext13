import { magnitudRespositorio } from "../repositorio/magnitudRespositorio";

export const obtenerMagnitudId = (id: string, clienteId: string) => {
  return magnitudRespositorio.obtenerMagnitudPorId(id, clienteId);
};
