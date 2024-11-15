import { EstadoProgramacion } from "@/app/api/equipos/dominio";
import { ProgramacionEquipos } from "../entity";

export interface ProgramacionEquiposRepositoryRead {
  listarProgramaciones(
    clienteId: string,
    page: number,
    limit: number
  ): Promise<ProgramacionEquipos[]>;
  listaProgramacionesPorFrecuenciaYActividad(
    clienteId: string,
    actividadId: string,
    frecuenciaId: string,
    equipoId: string
  ): Promise<ProgramacionEquipos[]>;
  obtenerProgramacionPorId(
    ID: string,
    clienteId: string
  ): Promise<ProgramacionEquipos | null>;
  obtenerTotal(clienteId: string): Promise<number>;
}

export interface ProgramacionEquiposRepositoryWrite {
  crearProgramaciones(
    clienteId: string,
    programacionEquipos: ProgramacionEquipos[]
  ): Promise<void>;
  cambiarProgramacionEstado(
    id: string,
    clienteId: string,
    estado: EstadoProgramacion
  ): Promise<void>;
}
