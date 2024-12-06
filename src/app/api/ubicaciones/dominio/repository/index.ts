import { Ubicacion } from "../entity";

export interface UbicacionReadRepository {
  obtenerPorID(
    clienteId: string,
    ubicacionId: string
  ): Promise<Ubicacion | null>;
}
