import { prisma } from "@/lib/prisma";
import { EjecucionEquipo } from "../../dominio/entity";
import { EjecucionEquipoWriteRepository } from "../../dominio/repository";

export class EjecucionEquipoWriteRepositoryImp
  implements EjecucionEquipoWriteRepository
{
  async crear(
    ejecucionEquipo: EjecucionEquipo
  ): Promise<
    Omit<EjecucionEquipo, "cliente" | "responsable" | "programacionEquipo">
  > {
    const res = await prisma.ejecucionEquipos.create({
      data: {
        observaciones: ejecucionEquipo.observaciones,
        clienteId: ejecucionEquipo.cliente.id,
        ejecutorId: ejecucionEquipo.responsable.id,
        fechaEjecucion: ejecucionEquipo.fechaEjecucion,
        programacionEquipoId: ejecucionEquipo.programacionEquipo.id,
      },
    });

    return {
      fechaEjecucion: res.fechaEjecucion,
      id: res.id,
      observaciones: res.observaciones,
    };
  }
}
