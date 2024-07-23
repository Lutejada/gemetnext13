import { EditarMarcaDto } from "../dtos/editarMarcadto";
import { marcaRepositorio } from "../repositorio/marcaRepositorio";

export const editarMarca = async (dto: EditarMarcaDto, clienteId: string) => {
  return marcaRepositorio.editarMarca(dto, clienteId);
};
