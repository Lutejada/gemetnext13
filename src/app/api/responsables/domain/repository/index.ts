import { Responsable } from "../entity";

export interface ResponsableRepositoryReader {
  obtenerResponsablePorID(
    clienteId: string,
    responsableId: string
  ): Promise<Responsable | null>;
}
