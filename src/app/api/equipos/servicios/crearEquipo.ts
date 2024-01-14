import { CrearEquipoDto } from "../dtos/crearEquipo.dto";
import { EquipoExiste } from "../errors";
import { equipoRepositorio } from "../repositorio/equipoRepositorio";
import { obtenerPorCodigo } from "./ObtenerPorCodigo";

export const crearEquipo = async (dto: CrearEquipoDto, clienteId: string) => {
  const equipoExiste = await obtenerPorCodigo(dto.codigo);
  if (equipoExiste) {
    throw new EquipoExiste();
  }
  return equipoRepositorio.crearEquipo(dto, clienteId);
};
