import { clienteRepositorio } from "../repositorio/clienteRepositorio"

export const obtenerClientePorNombre =(nombre:string)=>{
    return clienteRepositorio.obtenerClientePorNombre(nombre)
}