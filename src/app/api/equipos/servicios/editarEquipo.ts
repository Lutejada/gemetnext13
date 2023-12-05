import { Equipo } from "../dominio/index";
import { EditarEquipoDto } from "../dtos/editarEquipo.dto";
import { equipoRepositorio } from "../repositorio/equipoRepositorio";
import { validarEquipoExiste } from "./validarEquipoExiste";
export const editarEquipo = async (equipoDto: EditarEquipoDto) => {
  await validarEquipoExiste(equipoDto.codigo);
  const equipoToSave = {
    descripcion: equipoDto.descripcion,
    modelo: equipoDto.modelo,
    serie: equipoDto.serie,
    marca_id: equipoDto.marcaId,
    ubicacion_id: equipoDto.ubicacionId,
  };
  await equipoRepositorio.editarEquipo(equipoDto.codigo, equipoToSave);
};
