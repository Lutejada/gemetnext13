import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";
import { DatosComplementariosYaExisten } from "../errors";
import { equipoRepositorio } from "../repositorio/equipoRepositorio";
import { validarEquipoExiste } from "./validarEquipoExiste";

export const crearDatosComplementarios = async (
  dto: CrearDatosComplementariosDto,
  clienteId: string
) => {
  const equipoExiste = await validarEquipoExiste(dto.codigo, clienteId);
  if (equipoExiste.datos_complementarios) {
    throw new DatosComplementariosYaExisten();
  }

  return equipoRepositorio.crearDatosComplementarios(
    equipoExiste.id,
    dto,
    clienteId
  );
};
