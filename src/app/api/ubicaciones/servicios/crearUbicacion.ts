import { crearUbicacionDto } from "../dtos/crearUbicacion.dto"
import { ubicacionRepositorio } from "../repostorio/ubicacionRepositorio"

export const crearUbicacion =async(ubicacionDto:crearUbicacionDto)=>{
    return ubicacionRepositorio.crearUbicacion(ubicacionDto)
}