import { CrearProgramacionEquipoDto } from "../dtos/crearProgramation.dto";
import { EquipoNoExiste } from "../errors";
import { equipoRepositorio } from "../repositorio/equipoRepositorio";
import { validarEquipoExiste } from "./validarEquipoExiste";

export const crearProgramacionEquipos = async (
  dto: CrearProgramacionEquipoDto,
  clienteId: string
) => {
  const equipoExiste = await validarEquipoExiste(dto.codigo, clienteId);
  if (!equipoExiste) {
    throw new EquipoNoExiste();
  }
  return equipoRepositorio.crearProgramacionEquipo(dto, clienteId);
};
