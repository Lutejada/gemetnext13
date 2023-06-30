import { CrearVariableDto } from "../dtos/crear"
import { variableRepositorio } from "../repositorio/variableRepositorio"

export const crearVariable=(dto:CrearVariableDto)=>{
    return variableRepositorio.crearVariable(dto)
}