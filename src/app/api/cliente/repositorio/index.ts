import { Cliente } from "../dominio/entity";

export interface ClienteRepositorio {
  obtenerClientePorNombre: (nombre: string) => Promise<Cliente | null>;
  obtenerClientePorId: (id: string) => Promise<Cliente | null>;
}
