import { object, string } from "zod"

export interface crearUbicacionDto {
    nombre:string
    responsable_id:string
}

export const validarCrearUbicacion =(ubicacion:crearUbicacionDto)=>{
    object({
        nombre:string({description:'Nombre es requerido'}),
        responsable_id:string({description:'Nombre es requerido'}).cuid({message:'debe ser un cuid'})
    })
}