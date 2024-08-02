import { CrearEquipoDto } from "../dtos/crearEquipo.dto";
import { EquipoExiste } from "../../dominio/errors";
import { obtenerPorCodigo } from "./ObtenerPorCodigo";
import { equipoRepositorio } from "../../infrastructure/equipoRepositorio";

export const crearEquipo = async (dto: CrearEquipoDto, clienteId: string) => {
  const equipoExiste = await obtenerPorCodigo(dto.codigo, clienteId);
  if (equipoExiste) {
    throw new EquipoExiste();
  }
  return equipoRepositorio.crearEquipo(dto, clienteId);
};
