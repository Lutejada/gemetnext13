import { marcaRepositorio } from "../repositorio/marcaRepositorio"

export const obtenerTodosMarca=(clienteId:string)=>{
    return marcaRepositorio.obtenerMarcas(clienteId)
}