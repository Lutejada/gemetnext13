import { Cliente } from "../dominio";

export interface ClienteRepositorio {
  obtenerClientePorNombre: (nombre: string) => Promise<Cliente | null>;
}
