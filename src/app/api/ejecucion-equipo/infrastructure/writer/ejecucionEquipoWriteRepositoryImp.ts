import { prisma } from "@/lib/prisma";
import { Documentos, EjecucionEquipo } from "../../dominio/entity";
import { EjecucionEquipoWriteRepository } from "../../dominio/repository";
import { Prisma } from "@prisma/client";

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
        id: ejecucionEquipo.id,
        observaciones: ejecucionEquipo.observaciones,
        clienteId: ejecucionEquipo.cliente.id,
        ejecutorId: ejecucionEquipo.responsable.id,
        fechaEjecucion: ejecucionEquipo.fechaEjecucion,
        programacionEquipoId: ejecucionEquipo.programacionEquipo.id,
        documentos: ejecucionEquipo.documentos as Prisma.JsonArray,
      },
    });

    return {
      fechaEjecucion: res.fechaEjecucion,
      id: res.id,
      observaciones: res.observaciones,
      documentos: res.documentos as Documentos[],
    };
  }
}
