import { EditarDatosMetrologicosDto } from "../dtos/editarDatosMetrologicos.dto";
import { patronRepositorio } from "../repositorio/patronRepositorio";
import { validarPatronExiste } from "./validarPatronExiste";

export const editarDatosMetrologicos = async (
  dto: EditarDatosMetrologicosDto
) => {
  const patronExiste = await validarPatronExiste(dto.codigo);
  
  return patronRepositorio.editarDatosMetrologicos(patronExiste.id, dto);
};
