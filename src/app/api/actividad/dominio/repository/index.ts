import { Actividad } from "..";

export interface ActividadRepositoryRead {
  obtenerPorId(ID: string, clienteId: string): Promise<Actividad | null>;
}
