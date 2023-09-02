import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos.dto";
import { EquipoNoExiste } from "../errors";
import { DatosMetrologicosYaExisten } from '../errors/index';
import { equipoRepositorio } from "../repositorio/equipoRepositorio";
import { obtenerPorCodigo } from "./ObtenerPorCodigo";

export const crearDatosMetrologicos = async (
  dto: CrearDatosMetrologicosDto
) => {
  const equipoExiste = await obtenerPorCodigo(
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
