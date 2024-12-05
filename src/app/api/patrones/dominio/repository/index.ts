import { PaginationOptions } from "@/app/api/common/types";
import { Patron } from "..";
import { PatronEntity } from "../entity/intex";

export interface PatronReadRepository {
  obtenerPorID(ID: string, clienteId: string): Promise<Patron | null>;
  totalPatrones(clienteId: string): Promise<number>;
  listarPatrones(clienteId: string, page: number, limit: number): Promise<PatronEntity[]>;
  obtenerPatronesPorTermino(
    clienteId: string,
    termino: string,
    valor: string,
    paginationOptions: PaginationOptions
  ): Promise<PatronEntity[]>;
  totalPatronesPorTermino(
    clienteId: string,
    termino: string,
    valor: string
  ): Promise<number>;
}

export interface PatronWriteRepository {
  crearDatosBasicos(clienteId: string, Equipos: PatronEntity): Promise<void>;
}
