import { prisma } from "@/lib/prisma";
import { Marca } from "../../dominio";
import { MarcaReadRepository } from "../../dominio/repository";

export class MarcaReadRepositoryImp implements MarcaReadRepository {
  async obtenerPorID(
    clienteId: string,
    marcarID: string
  ): Promise<Marca | null> {
    const res = await prisma.marca.findUnique({
      where: { cliente_id: clienteId, id: marcarID },
    });

    if (!res) {
      return null;
    }

    return new Marca({
      id: res?.id,
      descripcion: res?.descripcion,
      fecha_inactivacion: res?.fecha_inactivacion,
      fechaactualizacion: res?.fechaactualizacion,
      fechaCreacion: res?.fechaCreacion,
      identificacion: res?.identificacion,
    });
  }
}
