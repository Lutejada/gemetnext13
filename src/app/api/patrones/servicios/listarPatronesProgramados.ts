import { ObtenerDatosDto } from "../../common/types/index";
import { patronRepositorio } from "../repositorio/patronRepositorio";

export const listarPatronesProgramados = (input: ObtenerDatosDto) => {
  return patronRepositorio.listarPatronesProgramados(input);
};
