import { magnitudRespositorio } from "../repositorio/magnitudRespositorio"

export const obtenerMagnitudes=()=>{
    return magnitudRespositorio.obtenerTodo()
}