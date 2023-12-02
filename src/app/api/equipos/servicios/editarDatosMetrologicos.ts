import { EditarDatosMetrologicosDto } from "../dtos/editarDatosMetrologicos.dto";
import { equipoRepositorio } from "../repositorio/equipoRepositorio";
import { validarEquipoExiste } from "./validarEquipoExiste";

export const editarDatosMetrologicos = async (
  dto: EditarDatosMetrologicosDto
) => {
  const equipoExiste = await validarEquipoExiste(dto.codigo);
  
  return equipoRepositorio.editarDatosMetrologicos(equipoExiste.id, dto);
};
