import { responsableRepositorio } from "../repositorio/responsableRepositorio"

export const obtenerResponsables=async()=>{
    return responsableRepositorio.obtenerResponsables()
}