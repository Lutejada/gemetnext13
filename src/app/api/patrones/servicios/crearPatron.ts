import { CrearPatronDto } from "../dtos/crear";
import { PatronYaExiste } from "../errors";
import { patronRepositorio } from "../repositorio/patronRepositorio";
import { obtenerPorCodigo } from './ObtenerPorCodigo';

export const crearPatron = async (dto: CrearPatronDto) => {
  const patronExiste = await obtenerPorCodigo(dto.codigo)
  if(patronExiste){
    throw new PatronYaExiste()
  }
  return patronRepositorio.crearPatron(dto);
};
