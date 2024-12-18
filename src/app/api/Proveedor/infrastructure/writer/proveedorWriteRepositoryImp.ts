import { prisma } from "@/lib/prisma";
import { Proveedor } from "../../dominio/entity";
import { ProveedorWriteRepository } from "../../dominio/repository";

export class ProveedorWriteRepositoryImp implements ProveedorWriteRepository {
  async crear(proveedor: Proveedor): Promise<void> {
    await prisma.proveedor.create({
      data: {
        nombre: proveedor.nombre,
        direccion: proveedor.direccion,
        email: proveedor.direccion,
        numeroIdentificacion: proveedor.direccion,
        telefono: proveedor.telefono,
        tipoIdetificacion: proveedor.tipoIdetificacion,
        clienteId: proveedor.cliente.id,
      },
    });
  }
}
