import { prisma } from "@/lib/prisma";
import { ClienteRepositorio } from ".";
import { Cliente } from "../dominio/entity";

export const clienteRepositorio: ClienteRepositorio = {
  obtenerClientePorNombre: async (nombre: string) => {
    return prisma.cliente.findUnique({
      where: {
        nombre,
      },
    });
  },
  obtenerClientePorId: function (id: string): Promise<Cliente | null> {
    return prisma.cliente.findUnique({
      where: {
        id,
      },
    });
  },
};
