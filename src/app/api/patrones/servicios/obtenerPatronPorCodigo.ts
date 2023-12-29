import { patronRepositorio } from "../repositorio/patronRepositorio"

export const obtenerPatronPorCodigo =(codigo:string)=>{
    return patronRepositorio.obtenerPatronPorCodigo(codigo)
}