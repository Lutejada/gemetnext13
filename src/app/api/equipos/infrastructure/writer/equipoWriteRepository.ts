import { prisma } from "@/lib/prisma";
import { EquipoWriteRepository } from "../../dominio/repository";
import { EstadoProgramacion } from "@prisma/client";

export class EquipoWriteRepositoryImp implements EquipoWriteRepository {
  async cambiarProgramacionEstado(
    id: string,
    clienteId: string,
    estadoProgramacion: EstadoProgramacion
  ): Promise<void> {
    await prisma.programacionEquipos.update({
      where: {
        clienteId,
        id,
      },
      data: {
        estado: estadoProgramacion,
      },
    });
  }
}
