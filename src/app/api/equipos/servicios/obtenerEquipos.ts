import { equipoRepositorio } from "../repositorio/equipoRepositorio"

export const obtenerEquipos =async()=>{
    return equipoRepositorio.obtenerEquipos()
}