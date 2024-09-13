import { CrearProgramacionEquipoDto } from "../dtos/crearProgramation.dto";
import { EquipoNoExiste } from "../../dominio/errors";
import { crearProgramacionAno } from "./crearProgramacionAno";
import { validarEquipoExiste } from "./validarEquipoExiste";
import { equipoRepositorio } from "../../infrastructure/equipoRepositorio";

export const crearProgramacionEquipos = async (
  dto: CrearProgramacionEquipoDto,
  clienteId: string
) => {
  const equipoExiste = await validarEquipoExiste(dto.codigo, clienteId);
  if (!equipoExiste) {
    throw new EquipoNoExiste();
  }
  const programacionListado = crearProgramacionAno(dto);

  return equipoRepositorio.crearProgramacionEquipo(
    programacionListado,
    clienteId
  );
};
