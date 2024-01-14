import { CrearVariableDto } from "../dtos/crear";
import { variableRepositorio } from "../repositorio/variableRepositorio";

export const crearVariable = (dto: CrearVariableDto, clienteId: string) => {
  return variableRepositorio.crearVariable(dto, clienteId);
};
