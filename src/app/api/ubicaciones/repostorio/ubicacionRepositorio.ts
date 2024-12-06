import { PrismaClient } from "@prisma/client";
import { UbicacionRepositorio } from ".";
import { crearUbicacionDto } from "../dtos/crearUbicacion.dto";
import { Ubicacion } from "../dominio/entity";
import { prisma } from "@/src/lib/prisma";

const crearUbicacion = async (
  ubicacion: crearUbicacionDto,
  clienteId: string
) => {
  const prisma = new PrismaClient();
  return prisma.ubicacion.create({
    data: {
      nombre: ubicacion.nombre,
      cliente_id: clienteId,
      responsable_id: ubicacion.responsable_id,
    },
  });
};

export const ubicacionRepositorio: UbicacionRepositorio = {
  crearUbicacion: crearUbicacion,
  obtenerUbicaciones: function (clienteId: string): Promise<Ubicacion[]> {
    return prisma.ubicacion.findMany({ where: { cliente_id: clienteId } });
  },
  obtenerPorNombre: function (
    nombre: string,
    clienteId: string
  ): Promise<Ubicacion | null> {
    return prisma.ubicacion.findUnique({
      where: {
        nombre,
        cliente_id: clienteId,
      },
    });
  },
};
