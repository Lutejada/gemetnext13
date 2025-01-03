import { prisma } from "@/lib/prisma";
import { ClienteReadRepository } from "../../dominio/repository/index";
import { cliente as ClientePrisma } from "@prisma/client";
import { Cliente } from "../../dominio/entity";
export class ClienteReadRepositoryImp implements ClienteReadRepository {
  async obtenerPorNombre(nombre: string) {
    const res = await prisma.cliente.findUnique({
      where: {
        nombre,
      },
    });

    if (!res) return null;
    return this.mapToDomainCliente(res);
  }

  private mapToDomainCliente(clientePrisma: ClientePrisma): Cliente {
    return new Cliente({
      id: clientePrisma.id,
      nombre: clientePrisma.nombre,
    });
  }
}
