import { CrearFrecuenciaDto } from "../dtos/crear"
import { frecuenciaRepositorio } from "../repositorio/frecuenciaResposito"

export const crearFrecuencia =(dto:CrearFrecuenciaDto)=>{
    return frecuenciaRepositorio.crearFrecuencia(dto)
}