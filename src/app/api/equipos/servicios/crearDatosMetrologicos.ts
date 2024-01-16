import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos.dto";
import { EquipoNoExiste } from "../errors";
import { DatosMetrologicosYaExisten } from "../errors/index";
import { equipoRepositorio } from "../repositorio/equipoRepositorio";
import { validarEquipoExiste } from "./validarEquipoExiste";

export const crearDatosMetrologicos = async (
  dto: CrearDatosMetrologicosDto,
  clienteId: string
) => {
  const equipoExiste = await validarEquipoExiste(dto.codigo, clienteId);

  if (equipoExiste.datos_metrologicos) {
    throw new DatosMetrologicosYaExisten();
  }

  return equipoRepositorio.crearDatosMetrologicos(
    dto,
    equipoExiste.id,
    clienteId
  );
};
