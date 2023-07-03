import { Frecuencia } from "../dominio";
import { CrearFrecuenciaDto } from "../dtos/crear";

export interface FrecuenciaRepositorio {
    crearFrecuencia:(dto:CrearFrecuenciaDto)=>Promise<Frecuencia>
    obtenerFrecuencias:()=>Promise<Frecuencia[]>
}