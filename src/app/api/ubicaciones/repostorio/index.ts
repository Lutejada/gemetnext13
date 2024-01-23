import { Ubicacion } from "../types";
import { crearUbicacionDto } from "../dtos/crearUbicacion.dto";

export interface UbicacionRepositorio {
  crearUbicacion: (
    ubicacion: crearUbicacionDto,
    clienteId: string
  ) => Promise<Ubicacion>;
  obtenerUbicaciones: (clienteId: string) => Promise<Ubicacion[]>;
  obtenerPorNombre: (
    nombre: string,
    clienteId: string
  ) => Promise<Ubicacion | null>;
}
