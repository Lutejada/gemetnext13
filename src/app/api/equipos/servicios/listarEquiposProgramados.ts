import { equipoRepositorio } from "../repositorio/equipoRepositorio";
import { ObtenerDatosDto } from "../../common/types/index";

export const listarEquiposProgramados = (
  clienteId: string,
  input: ObtenerDatosDto
) => {
  return equipoRepositorio.listarEquiposProgramados(clienteId, input);
};
