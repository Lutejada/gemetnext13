import { CrearProgramacionPatronDto } from "../dtos/crearProgramation.dto";
import { PatronNoExiste } from "../dominio/errors";
import { patronRepositorio } from "../repositorio/patronRepositorio";
import { validarPatronExiste } from "./validarPatronExiste";

export const crearProgramacionPatrones = async (
  dto: CrearProgramacionPatronDto,
  clienteId: string
) => {
  const patronExiste = await validarPatronExiste(dto.codigo, clienteId);
  if (!patronExiste) {
    throw new PatronNoExiste();
  }
  return patronRepositorio.crearProgramacionPatron(dto, clienteId);
};
