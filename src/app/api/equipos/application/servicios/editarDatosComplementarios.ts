import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";
import { DatosComplementariosYaExisten } from "../../dominio/errors";
import { validarEquipoExiste } from "./validarEquipoExiste";
import { equipoRepositorio } from "../../infrastructure/equipoRepositorio";

export const editarDatosComplementarios = async (
  dto: CrearDatosComplementariosDto,
  clienteId: string
) => {
  const equipoExiste = await validarEquipoExiste(dto.codigo, clienteId);

  return equipoRepositorio.editarDatosComplementarios(
    equipoExiste.id,
    dto,
    clienteId
  );
};
