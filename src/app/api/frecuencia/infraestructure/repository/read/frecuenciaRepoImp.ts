import { prisma } from "@/lib/prisma";
import { Frecuencia } from "../../../dominio";
import { FrecuenciaRepositoryRead } from "../../../dominio/repository/index";

export class FrecuenciaRepositoryReadImp implements FrecuenciaRepositoryRead {
  async obtenerFrecuenciaPorId(
    Id: string,
    clienteId: string
  ): Promise<Frecuencia | null> {
    const frecuencia = await prisma.frecuencia.findUnique({
      where: { cliente_id: clienteId, id: Id },
    });

    if (!frecuencia) return null;
    return frecuencia;
  }
}
