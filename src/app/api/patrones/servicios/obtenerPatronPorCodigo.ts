import { patronRepositorio } from "../repositorio/patronRepositorio";

export const obtenerPatronPorCodigo = (codigo: string, clienteId: string) => {
  return patronRepositorio.obtenerPatronPorCodigo(codigo, clienteId);
};
