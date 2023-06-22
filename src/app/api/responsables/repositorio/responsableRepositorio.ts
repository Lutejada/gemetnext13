import { PrismaClient } from "@prisma/client";
import { ResponsableRepositorio } from ".";
import { CrearResponsableDto } from "../dtos/crearResponsable.dto";
import { Responsable } from "../types";

const crearResponsable = async (
  responsable: CrearResponsableDto
): Promise<void> => {
  const prisma = new PrismaClient();
  await prisma.responsable.create({
    data: {
      identificacion: responsable.identificacion,
      nombre: responsable.nombre,
      apellido: responsable.apellido,
    },
  });
};

const obtenerResponsables = (): Promise<Responsable[]> => {
  const prisma = new PrismaClient();
  return prisma.responsable.findMany();
};
const obtenerResponsableIdent = async (
  identificacion: string
): Promise<Responsable | null> => {
  const prisma = new PrismaClient();
  const res = await prisma.responsable.findUnique({
    where: {
      identificacion: identificacion,
    },
  });
  return res;
};

const obtenerResponsableID = (id: string) => {
  const prisma = new PrismaClient();
  return prisma.responsable.findUnique({
    where: {
      id,
    },
  });
};

export const responsableRepositorio: ResponsableRepositorio = {
  crearResponsable: crearResponsable,
  obtenerResponsables,
  obtenerResponsableIdent: obtenerResponsableIdent,
  obtenerResponsableID: obtenerResponsableID,
};
