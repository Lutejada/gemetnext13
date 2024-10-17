import { EjecucionPatronWriteRepository } from "../../../dominio/repository";
import { ResponsableNoExiste } from "@/app/api/responsables/errors";

import {
  ProgramacionNoExiste,
  ProgramacionYaCompletada,
} from "@/app/api/equipos/dominio/errors";
import { EstadoProgramacion } from "@/app/api/equipos/dominio";
import { ResponsableRepositoryReader } from "@/app/api/responsables/domain/repository";
import { CrearEjecucionDTO } from "../../dto/crearEjecucionPatron";
import {
  ProgramacionPatronesRepositoryRead,
  ProgramacionPatronesRepositoryWrite,
} from "@/app/api/programacion-patrones/domain/repository/indext";

export class CrearEjecucionPatrones {
  constructor(
    private ejecucionRepo: EjecucionPatronWriteRepository,
    private programacionRepoRead: ProgramacionPatronesRepositoryRead,
    private programacionRepoWrite: ProgramacionPatronesRepositoryWrite,
    private responsableRepo: ResponsableRepositoryReader
  ) {}
  async execute(clienteId: string, dto: CrearEjecucionDTO) {
    const responsable = await this.responsableRepo.obtenerResponsablePorID(
      clienteId,
      dto.ejecutorId
    );
    if (!responsable) {
      throw new ResponsableNoExiste();
    }
    const programacionPatron =
      await this.programacionRepoRead.obtenerProgramacionPorId(
        dto.programacionPatronId,
        clienteId
      );
    if (!programacionPatron) {
      throw new ProgramacionNoExiste();
    }
    if (programacionPatron.estado === EstadoProgramacion.COMPLETADO) {
      throw new ProgramacionYaCompletada();
    }
    await this.ejecucionRepo.crear({
      observaciones: dto.observaciones,
      fechaEjecucion: dto.fechaEjecucion,
      responsable: responsable,
      cliente: {
        id: clienteId,
        nombre: clienteId,
      },
      programacionPatron: programacionPatron,
    });
    await this.programacionRepoWrite.cambiarProgramacionEstado(
      dto.programacionPatronId,
      clienteId,
      EstadoProgramacion.COMPLETADO
    );
  }
}
