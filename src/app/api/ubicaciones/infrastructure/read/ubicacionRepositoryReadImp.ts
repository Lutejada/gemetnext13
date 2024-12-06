import { prisma } from "@/lib/prisma";
import { Ubicacion } from "../../dominio/entity";
import { UbicacionReadRepository } from "../../dominio/repository";
import { Responsable } from "@/app/api/responsables/domain/entity";

export class UbicacionRepositoryReadImp implements UbicacionReadRepository {
  async obtenerPorID(
    clienteId: string,
    ubicacionId: string
  ): Promise<Ubicacion | null> {
    const res = await prisma.ubicacion.findUnique({
      where: {
        cliente_id: clienteId,
        id: ubicacionId,
      },
    });

    if (!res) {
      return null;
    }

    return new Ubicacion({
      id: res.id,
      nombre: res.nombre,
      responsable: {} as Responsable, //Mejorar,
      fecha_creacion: res.fecha_creacion,
      fecha_actualizacion: res.fecha_actualizacion,
      fecha_inactivacion: res.fecha_inactivacion,
    });
  }
}
