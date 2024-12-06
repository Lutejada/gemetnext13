import { Marca } from "..";

export interface MarcaReadRepository {
  obtenerPorID(clienteId: string, marcarID: string): Promise<Marca | null>;
}
