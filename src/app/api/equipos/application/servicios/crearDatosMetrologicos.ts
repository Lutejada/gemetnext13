import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos.dto";
import { EquipoNoExiste } from "../../dominio/errors";
import { DatosMetrologicosYaExisten } from "../../dominio/errors/index";
import { validarEquipoExiste } from "./validarEquipoExiste";
import { equipoRepositorio } from "../../infrastructure/equipoRepositorio";

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
