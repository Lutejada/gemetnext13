import { Patron } from "..";
import { PatronEntity } from "../entity/intex";

export interface PatronRepositoryRead {
  obtenerPorID(ID: string, clienteId: string): Promise<Patron | null>;
  totalPatrones(clienteId: string): Promise<number>;
  listarPatrones(clienteId: string, page: number, limit: number): Promise<PatronEntity[]>;
}

export interface PatronWriteRepository {
  crearDatosBasicos(clienteId: string, Equipos: PatronEntity): Promise<void>;
}
