import { ProgramacionPatrones } from "../entity";

export interface ProgramacionPatronesRepositoryRead {
  listarProgramaciones(
    clienteId: string
  ): Promise<ProgramacionPatrones[] | null>;
  listaProgramacionesPorFrecuenciaYActividad(
    clienteId: string,
    actividadId: string,
    frecuenciaId: string
  ): Promise<ProgramacionPatrones[]>;
}

export interface ProgramacionPatronesRepositoryWrite {
  crearProgramaciones(
    clienteId: string,
    programacionPatrones: ProgramacionPatrones[]
  ): Promise<void>;
}
