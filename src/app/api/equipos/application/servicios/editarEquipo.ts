import { Equipo } from "../../dominio/index";
import { equipoRepositorio } from "../../infrastructure/equipoRepositorio";
import { EditarEquipoDto } from "../dtos/editarEquipo.dto";
import { validarEquipoExiste } from "./validarEquipoExiste";
export const editarEquipo = async (
  equipoDto: EditarEquipoDto,
  clienteId: string
) => {
  await validarEquipoExiste(equipoDto.codigo, clienteId);
  const equipoToSave = {
    descripcion: equipoDto.descripcion,
    modelo: equipoDto.modelo,
    serie: equipoDto.serie,
    marca_id: equipoDto.marcaId,
    ubicacion_id: equipoDto.ubicacionId,
  };
  await equipoRepositorio.editarEquipo(
    equipoDto.codigo,
    equipoToSave,
    clienteId
  );
};
