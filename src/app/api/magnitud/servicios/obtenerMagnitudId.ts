import { magnitudRespositorio } from "../repositorio/magnitudRespositorio"

export const obtenerMagnitudId=(id:string)=>{
    return magnitudRespositorio.obtenerMagnitudPorId(id)
}