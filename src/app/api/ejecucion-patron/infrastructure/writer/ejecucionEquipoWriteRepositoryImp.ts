import { prisma } from "@/lib/prisma";
import { EjecucionPatron } from "../../dominio/entity";
import { EjecucionPatronWriteRepository } from "../../dominio/repository";

export class EjecucionPatronWriteRepositoryImp
  implements EjecucionPatronWriteRepository
{
  async crear(ejecucionPatron: EjecucionPatron): Promise<void> {
    await prisma.ejecucionPatrones.create({
      data: {
        observaciones: ejecucionPatron.observaciones,
        clienteId: ejecucionPatron.cliente.id,
        ejecutorId: ejecucionPatron.responsable.id,
        fechaEjecucion: ejecucionPatron.fechaEjecucion,
        programacionPatronId: ejecucionPatron.programacionPatron.id,
      },
    });
  }
}
