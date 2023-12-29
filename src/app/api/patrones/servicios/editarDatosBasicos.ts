import { Patron } from "../dominio";
import { EditarBasicosDto } from "../dtos/editarBasicos.dto";
import { patronRepositorio } from "../repositorio/patronRepositorio";
import { validarPatronExiste } from "./validarPatronExiste";
export const editarDatosBasicos = async (equipoDto: EditarBasicosDto) => {
  await validarPatronExiste(equipoDto.codigo);
  const patronToSave: Partial<Patron> = {
    descripcion: equipoDto.descripcion,
    modelo: equipoDto.modelo,
    serie: equipoDto.serie,
    marca_id: equipoDto.marcaId,
    ubicacionId: equipoDto.ubicacionId,
  };
  await patronRepositorio.editarDatosBasicos(equipoDto.codigo, patronToSave);
};
