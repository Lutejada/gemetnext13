import { prisma } from "@/lib/prisma";
import { ClienteRepositorio } from ".";

export const clienteRepositorio: ClienteRepositorio = {
  obtenerClientePorNombre: async (nombre: string) => {
    return prisma.cliente.findUnique({
      where: {
        nombre,
      },
    });
  },
};
