import { Magnitud } from "../dominio";
import { CrearMagnitudDto } from "../dtos/crearMagnitud.dto";

export interface MagnitudRepositorio {
    crearMagnitud:(dto:CrearMagnitudDto)=>Promise<Magnitud>
    obtenerMagnitudPorId:(id:string)=>Promise<Magnitud | null>
    obtenerTodo:()=>Promise<Magnitud[]>
}