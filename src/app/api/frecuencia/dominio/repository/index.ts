import { Frecuencia } from "..";

export interface FrecuenciaRepositoryRead {
  obtenerFrecuenciaPorId(
    Id: string,
    clienteId: string
  ): Promise<Frecuencia | null>;
}
