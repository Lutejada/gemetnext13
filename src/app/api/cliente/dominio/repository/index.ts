import { Cliente } from "../entity";

export interface ClienteReadRepository {
  obtenerPorNombre(nombre: string): Promise<Cliente | null>;
}
