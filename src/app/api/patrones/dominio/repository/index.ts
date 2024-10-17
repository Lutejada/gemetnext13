import { Patron } from "..";

export interface PatronRepositoryRead {
  obtenerPorID(ID: string, clienteId: string): Promise<Patron | null>;
}
