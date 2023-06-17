export interface Ubicacion {
    id:string
    nombre:string
    responsable_id:string
    fecha_creacion:string | Date
    fecha_actualizacion:string | Date
    fecha_inactivacion?:string | Date | null
}