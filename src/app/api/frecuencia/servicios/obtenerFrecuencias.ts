import { frecuenciaRepositorio } from "../repositorio/frecuenciaResposito"

export const obtenerfrecuencia = ()=>{
    return frecuenciaRepositorio.obtenerFrecuencias();
}