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
} from "@/app/api/programacion-patrones/domain/repository";
import { IFilesAdaptor } from "@/app/api/common/files/saveFiles";
import { randomUUID } from "crypto";
import { Documentos } from "../../../dominio/entity";

export class CrearEjecucionPatrones {
  constructor(
    private ejecucionRepo: EjecucionPatronWriteRepository,
    private programacionRepoRead: ProgramacionPatronesRepositoryRead,
    private programacionRepoWrite: ProgramacionPatronesRepositoryWrite,
    private responsableRepo: ResponsableRepositoryReader,
    private saveFilesAdaptor: IFilesAdaptor
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
    const ejecucionPatronId = randomUUID().toString();
    let archivosUrls: Documentos[] = [];
    if (dto.archivos) {
      // /ejecucion-patrones/clienteID/ejecucionID
      const pathName = `ejecucion-equipos/${clienteId}/${ejecucionPatronId}`;
      const res = await this.saveFilesAdaptor.saveFiles(pathName, dto.archivos);
      archivosUrls = res;
    }
    await this.ejecucionRepo.crear({
      id: ejecucionPatronId,
      observaciones: dto.observaciones,
      fechaEjecucion: dto.fechaEjecucion,
      responsable: responsable,
      cliente: {
        id: clienteId,
        nombre: clienteId,
      },
      programacionPatron: programacionPatron,
      documentos: archivosUrls,
    });
    await this.programacionRepoWrite.cambiarProgramacionEstado(
      dto.programacionPatronId,
      clienteId,
      EstadoProgramacion.COMPLETADO
    );
  }
}
