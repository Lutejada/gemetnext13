import { actividadRepositorio } from "../repositorio/actividadRepositorio"

export const obtenerActividades =()=>{
    return actividadRepositorio.obtenerActividades()
}