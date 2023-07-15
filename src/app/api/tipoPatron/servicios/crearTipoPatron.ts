import { CrearTipoPatronDto } from "../dtos/crear"
import { tipoPatronRespositorio } from "../repositorio/tipoPatronRepositorio"

export const crearTipoPatron =(dto:CrearTipoPatronDto)=>{
    return tipoPatronRespositorio.creatTipoPatron(dto)
}