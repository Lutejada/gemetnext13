import { CrearProgramacionPatronDto } from "../dtos/crearProgramation.dto";
import { PatronNoExiste } from "../errors";
import { patronRepositorio } from "../repositorio/patronRepositorio";
import { validarPatronExiste } from "./validarPatronExiste";

export const crearProgramacionPatrones = async (
  dto: CrearProgramacionPatronDto
) => {
  const patronExiste = await validarPatronExiste(dto.codigo);
  if (!patronExiste) {
    throw new PatronNoExiste();
  }
  return patronRepositorio.crearProgramacionPatron(dto);
};
