import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos.dto";
import { EquipoNoExiste } from "../errors";
import { equipoRepositorio } from "../repositorio/equipoRepositorio";
import { DatosMetrologicosYaExisten } from '../errors/index';

export const crearDatosMetrologicos = async (
  dto: CrearDatosMetrologicosDto
) => {
  const equipoExiste = await equipoRepositorio.obtenerEquiporPorCodigo(
    dto.codigo
  );
  if (!equipoExiste) {
    throw new EquipoNoExiste();
  }

  if (equipoExiste.datos_metrologicos) {
    throw new DatosMetrologicosYaExisten();
  }

  return equipoRepositorio.crearDatosMetrologicos(dto, equipoExiste.id);
};
