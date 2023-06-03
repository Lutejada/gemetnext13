import { PrismaClient } from "@prisma/client";
import { ResponsableRepositorio } from ".";
import { crearResponsableDto } from "../dtos/crearResponsable.dto";
import { Responsable } from "../types";

const crearResponsable = async (
  responsable: crearResponsableDto
): Promise<void> => {
  const prisma = new PrismaClient();
  await prisma.responsable.create({
    data: {
      alias: responsable.alias,
      nombre: responsable.nombre,
    },
  });
};

const obtenerResponsables = (): Promise<Responsable[]> => {
  const prisma = new PrismaClient();
  return prisma.responsable.findMany()
};

export const responsableRepositorio: ResponsableRepositorio = {
  crearResponsable: crearResponsable,
  obtenerResponsables,
};
