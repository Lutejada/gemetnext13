import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos.dto";
import { EquipoNoExiste } from "../errors";
import { DatosMetrologicosYaExisten } from "../errors/index";
import { equipoRepositorio } from "../repositorio/equipoRepositorio";
import { validarEquipoExiste } from "./validarEquipoExiste";

export const crearDatosMetrologicos = async (
  dto: CrearDatosMetrologicosDto
) => {
  const equipoExiste = await validarEquipoExiste(dto.codigo);

  if (equipoExiste.datos_metrologicos) {
    throw new DatosMetrologicosYaExisten();
  }

  return equipoRepositorio.crearDatosMetrologicos(dto, equipoExiste.id);
};
