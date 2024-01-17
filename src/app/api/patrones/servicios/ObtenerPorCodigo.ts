import { patronRepositorio } from "../repositorio/patronRepositorio";

export const obtenerPorCodigo = (codigo: string, clienteId: string) => {
  return patronRepositorio.obtenerPatronPorCodigo(codigo, clienteId);
};
