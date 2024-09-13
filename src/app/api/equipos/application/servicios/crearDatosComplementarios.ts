import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";
import { DatosComplementariosYaExisten } from "../../dominio/errors";
import { validarEquipoExiste } from "./validarEquipoExiste";
import { equipoRepositorio } from "../../infrastructure/equipoRepositorio";

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
