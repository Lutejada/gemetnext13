import { EstadoProgramacion } from "@/app/api/equipos/dominio";
import { ProgramacionEquipos } from "../entity";

export interface ProgramacionEquiposRepositoryRead {
  listarProgramaciones(clienteId: string): Promise<ProgramacionEquipos[]>;
  listaProgramacionesActivas(
    clienteId: string,
    actividadId: string,
    frecuenciaId: string,
    equipoId: string
  ): Promise<ProgramacionEquipos[]>;
  obtenerProgramacionPorId(
    ID: string,
    clienteId: string
  ): Promise<ProgramacionEquipos | null>;
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
