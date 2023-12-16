import { equipoRepositorio } from "../repositorio/equipoRepositorio";
import { ObtenerDatosDto } from "../../common/types/index";

export const listarEquiposProgramados = (input: ObtenerDatosDto) => {
  return equipoRepositorio.listarEquiposProgramados(input);
};
