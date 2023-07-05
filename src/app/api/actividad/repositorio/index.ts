import { Actividad } from "../dominio";
import { CrearActividadDto } from "../dtos/crear";

export interface ActividadRepositorio {
    crearActividad:(dto:CrearActividadDto)=>Promise<Actividad>
    obtenerActividades:()=>Promise<Actividad[]>
}