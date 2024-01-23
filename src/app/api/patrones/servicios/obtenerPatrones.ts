import { ObtenerDatosDto } from "../../common/types";
import { patronRepositorio } from "../repositorio/patronRepositorio";

export const obtenerPatrones = (clienteId: string, dto?: ObtenerDatosDto) => {
  return patronRepositorio.obtenerPatrones(clienteId, dto);
};
