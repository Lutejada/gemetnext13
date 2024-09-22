import { EjecucionEquipoWriteRepository } from "../../../dominio/repository";
import { CrearEjecucionDTO } from "../../dto/crearEjecucionEquipo";
import { ResponsableRepositoryReader } from "../../../../responsables/domain/repository/index";
import { ResponsableNoExiste } from "@/app/api/responsables/errors";
import { Cliente } from "../../../../cliente/dominio/index";

export class CrearEjecucionEquipos {
  constructor(
    private ejecucionRepo: EjecucionEquipoWriteRepository,
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
    await this.ejecucionRepo.crear({
      observaciones: dto.observaciones,
      fechaEjecucion: dto.fechaEjecucion,
      responsable: responsable,
      cliente: {
        id: clienteId,
        nombre: clienteId,
      },
    });
  }
}
