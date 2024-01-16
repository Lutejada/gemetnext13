import { equipoRepositorio } from "../repositorio/equipoRepositorio";

export const obtenerPorCodigo = (codigo: string, clienteId: string) => {
  return equipoRepositorio.obtenerEquipoPorCodigo(codigo, clienteId);
};
