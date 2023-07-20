import { patronRepositorio } from "../repositorio/patronRepositorio"

export const obtenerPorCodigo=(codigo:string)=>{
    return patronRepositorio.obtenerPatronPorCodigo(codigo);
}