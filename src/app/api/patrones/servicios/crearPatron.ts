import { CrearPatronDto } from "../dtos/crearPatrones";
import { PatronYaExiste } from "../errors";
import { patronRepositorio } from "../repositorio/patronRepositorio";
import { obtenerPorCodigo } from "./ObtenerPorCodigo";

export const crearPatron = async (dto: CrearPatronDto, clienteId: string) => {
  const patronExiste = await obtenerPorCodigo(dto.codigo, clienteId);
  if (patronExiste) {
    throw new PatronYaExiste();
  }
  return patronRepositorio.crearPatron(dto, clienteId);
};
