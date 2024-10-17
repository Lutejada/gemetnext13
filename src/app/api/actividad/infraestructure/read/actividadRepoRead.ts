import { prisma } from "@/lib/prisma";
import { Actividad } from "../../dominio";
import { ActividadRepositoryRead } from "../../dominio/repository/index";
export class ActividadRepoReadImp implements ActividadRepositoryRead {
  async obtenerPorId(ID: string, clienteId: string): Promise<Actividad | null> {
    const res = await prisma.tipo_actividad.findUnique({
      where: {
        id: ID,
        cliente_id: clienteId,
      },
    });

    return res;
  }
}
