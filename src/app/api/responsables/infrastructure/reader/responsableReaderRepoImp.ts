import { prisma } from "@/lib/prisma";
import { ResponsableRepositoryReader } from "../../domain/repository";
import { Responsable } from "../../domain/entity";

export class ResponsableReaderRepoImp implements ResponsableRepositoryReader {
  async obtenerResponsablePorID(
    clienteId: string,
    responsableId: string
  ): Promise<Responsable | null> {
    const res = await prisma.responsable.findUnique({
      where: {
        cliente_id: clienteId,
        id: responsableId,
      },
    });
    if (!res) {
      return null;
    }
    return new Responsable({
      id: res.id,
      apellido: res.apellido,
      fechaCreacion: res.fecha_creacion,
      nombre: res.nombre,
      identificacion: res.identificacion,
      fechaActualizacion: res.fecha_actualizacion,
      cliente: {
        id: clienteId,
        nombre: "",
      },
    });
  }
}
