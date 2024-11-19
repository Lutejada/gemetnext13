import { queryValuesDTO } from "../../common/types/index";
import { patronRepositorio } from "../repositorio/patronRepositorio";

export const listarPatronesProgramados = (
  input: queryValuesDTO,
  clienteId: string
) => {
  return patronRepositorio.listarPatronesProgramados(clienteId, input);
};
