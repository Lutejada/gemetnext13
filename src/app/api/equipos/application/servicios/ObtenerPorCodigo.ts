import { equipoRepositorio } from "../../infrastructure/equipoRepositorio";

export const obtenerPorCodigo = (codigo: string, clienteId: string) => {
  return equipoRepositorio.obtenerEquipoPorCodigo(codigo, clienteId);
};
