import { CrearMagnitudDto } from "../dtos/crearMagnitud.dto"
import { magnitudRespositorio } from "../repositorio/magnitudRespositorio"

export const crearMagnitud =(dto:CrearMagnitudDto)=>{
    return magnitudRespositorio.crearMagnitud(dto)
}