import {crearResponsableDto} from '../dtos/crearResponsable.dto'
import {responsableRepositorio} from '../repositorio/responsableRepositorio'

export const crearResponsable=async (responsable:crearResponsableDto)=>{
    await responsableRepositorio.crearResponsable(responsable)
}