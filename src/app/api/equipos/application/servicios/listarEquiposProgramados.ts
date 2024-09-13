import { ObtenerDatosDto } from "../../../common/types/index";
import { equipoRepositorio } from "../../infrastructure/equipoRepositorio";

export const listarEquiposProgramados = (
  clienteId: string,
  input: ObtenerDatosDto
) => {
  return equipoRepositorio.listarEquiposProgramados(clienteId, input);
};
