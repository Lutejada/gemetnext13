import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";
import { DatosComplementariosYaExisten } from "../errors";
import { equipoRepositorio } from "../repositorio/equipoRepositorio";
import { validarEquipoExiste } from "./validarEquipoExiste";

export const crearDatosComplementarios = async (
  dto: CrearDatosComplementariosDto
) => {
  const equipoExiste = await validarEquipoExiste(dto.codigo);
  if (equipoExiste.datos_complementarios) {
    throw new DatosComplementariosYaExisten();
  }

  return equipoRepositorio.crearDatosComplementarios(equipoExiste.id, dto);
};
