import { CrearProgramacionEquipoDto } from "../dtos/crearProgramation.dto";
import { equipoRepositorio } from "../repositorio/equipoRepositorio";
import { validarEquipoExiste } from "./validarEquipoExiste";

export const crearProgramacionEquipos=async(dto:CrearProgramacionEquipoDto)=>{
    const equipoExiste = await validarEquipoExiste(dto.codigo);
    return equipoRepositorio.crearProgramacionEquipo(dto);
}