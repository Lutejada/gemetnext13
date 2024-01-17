import { ObtenerDatosDto } from "../../common/types/index";
import { patronRepositorio } from "../repositorio/patronRepositorio";

export const listarPatronesProgramados = (
  input: ObtenerDatosDto,
  clienteId: string
) => {
  return patronRepositorio.listarPatronesProgramados(clienteId, input);
};
