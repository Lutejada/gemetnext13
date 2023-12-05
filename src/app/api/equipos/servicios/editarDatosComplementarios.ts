import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";
import { DatosComplementariosYaExisten } from "../errors";
import { equipoRepositorio } from "../repositorio/equipoRepositorio";
import { validarEquipoExiste } from "./validarEquipoExiste";

export const editarDatosComplementarios = async (
  dto: CrearDatosComplementariosDto
) => {
  const equipoExiste = await validarEquipoExiste(dto.codigo);
  
  return equipoRepositorio.editarDatosComplementarios(equipoExiste.id, dto);
};
