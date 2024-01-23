import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";

import { patronRepositorio } from "../repositorio/patronRepositorio";
import { validarPatronExiste } from "./validarPatronExiste";

export const editarDatosComplementarios = async (
  dto: CrearDatosComplementariosDto,
  clienteId: string
) => {
  const equipoExiste = await validarPatronExiste(dto.codigo, clienteId);

  return patronRepositorio.editarDatosComplementarios(
    equipoExiste.id,
    dto,
    clienteId
  );
};
