import { Ubicacion } from "../types";
import { crearUbicacionDto } from "../dtos/crearUbicacion.dto";

export interface UbicacionRepositorio {
  crearUbicacion: (ubicacion: crearUbicacionDto) => Promise<Ubicacion>;
  obtenerUbicaciones:()=>Promise<Ubicacion[]>
  obtenerPorNombre:(nombre:string)=>Promise<Ubicacion|null>
}
