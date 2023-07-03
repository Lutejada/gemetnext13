import { CrearActividadDto } from "../dtos/crear"
import { actividadRepositorio } from "../repositorio/actividadRepositorio"

export const crearActividad =(dto:CrearActividadDto)=>{
    return actividadRepositorio.crearActividad(dto)
}