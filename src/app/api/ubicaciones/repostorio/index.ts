import { Ubicacion } from "../types";
import { crearUbicacionDto } from "../dtos/crearUbicacion.dto";

export interface UbicacionRepositorio {
  crearUbicacion: (ubicacion: crearUbicacionDto) => Promise<Ubicacion>;
  obtenerUbicacionPorResponsableId: (
    responsableID: string
  ) => Promise<Ubicacion | null>;
}
