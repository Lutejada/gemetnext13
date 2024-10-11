import { prisma } from "@/lib/prisma";
import { Patron } from "../../../dominio";
import { PatronRepositoryRead } from "../../../dominio/repository";

export class PatronRepositoryReadImp implements PatronRepositoryRead {
  async obtenerPorID(ID: string, clienteId: string): Promise<Patron | null> {
    const patron = await prisma.patrones.findUnique({
      where: { cliente_id: clienteId, id: ID },
    });
    if (!patron) {
      return null;
    }
    const patronEntity: Patron = {
      id: patron?.id,
      codigo: patron.codigo,
      descripcion: patron.descripcion,
      modelo: patron.modelo,
      serie: patron.serie,
      marca_id: patron.marca_id,
      fecha_creacion: patron.fecha_creacion,
      fecha_actualizacion: patron.fecha_actualizacion,
      fecha_inactivacion: patron.fecha_inactivacion,
      clienteId: patron.cliente_id,
    };
    return patronEntity;
  }
}
