import { magnitudRespositorio } from "../repositorio/magnitudRespositorio";

export const obtenerMagnitudes = (clienteId: string) => {
  return magnitudRespositorio.obtenerMagnitudes(clienteId);
};
