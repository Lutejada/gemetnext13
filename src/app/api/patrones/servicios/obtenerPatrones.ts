import { ObtenerDatosDto } from "../../common/types";
import { patronRepositorio } from "../repositorio/patronRepositorio";

export const obtenerPatrones = (dto?: ObtenerDatosDto) => {
  return patronRepositorio.obtenerPatrones(dto);
};
