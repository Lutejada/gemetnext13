import { CrearEquipoDto } from "../dtos/crear"
import { equipoRepositorio } from "../repositorio/equipoRepositorio"

export const crearEquipo =(dto:CrearEquipoDto)=>{
    return equipoRepositorio.crearEquipo(dto);
}