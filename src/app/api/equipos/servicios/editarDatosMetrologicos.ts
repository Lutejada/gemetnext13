import { EditarDatosMetrologicosDto } from "../dtos/editarDatosMetrologicos.dto";
import { equipoRepositorio } from "../repositorio/equipoRepositorio";
import { validarEquipoExiste } from "./validarEquipoExiste";

export const editarDatosMetrologicos = async (
  dto: EditarDatosMetrologicosDto,
  clienteId: string
) => {
  const equipoExiste = await validarEquipoExiste(dto.codigo, clienteId);

  return equipoRepositorio.editarDatosMetrologicos(
    equipoExiste.id,
    dto,
    clienteId
  );
};
