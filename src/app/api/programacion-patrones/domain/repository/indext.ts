import { EstadoProgramacion } from "@/app/api/equipos/dominio";
import { ProgramacionPatrones } from "../entity";

export interface ProgramacionPatronesRepositoryRead {
  listarProgramaciones(
    clienteId: string,
    page: number,
    limit: number
  ): Promise<ProgramacionPatrones[]>;
  listaProgramacionesPorFrecuenciaYActividad(
    clienteId: string,
    actividadId: string,
    frecuenciaId: string,
    patronId: string
  ): Promise<ProgramacionPatrones[]>;
  obtenerProgramacionPorId(
    ID: string,
    clienteId: string
  ): Promise<ProgramacionPatrones | null>;
  obtenerTotal(clienteId: string): Promise<number>;
}

export interface ProgramacionPatronesRepositoryWrite {
  crearProgramaciones(
    clienteId: string,
    programacionPatrones: ProgramacionPatrones[]
  ): Promise<void>;
  cambiarProgramacionEstado(
    id: string,
    clienteId: string,
    estado: EstadoProgramacion
  ): Promise<void>;
}
