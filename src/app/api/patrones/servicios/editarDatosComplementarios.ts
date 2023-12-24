import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";

import { patronRepositorio } from "../repositorio/patronRepositorio";
import { validarPatronExiste } from "./validarPatronExiste";

export const editarDatosComplementarios = async (
  dto: CrearDatosComplementariosDto
) => {
  const equipoExiste = await validarPatronExiste(dto.codigo);

  return patronRepositorio.editarDatosComplementarios(equipoExiste.id, dto);
};
