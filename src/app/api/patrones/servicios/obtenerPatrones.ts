import { queryValuesDTO } from "../../common/types";
import { patronRepositorio } from "../repositorio/patronRepositorio";

export const obtenerPatrones = (clienteId: string, dto?: queryValuesDTO) => {
  return patronRepositorio.obtenerPatrones(clienteId, dto);
};
