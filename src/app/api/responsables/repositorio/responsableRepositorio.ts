import { ResponsableRepositorio } from ".";
import { CrearResponsableDto } from "../dtos/crearResponsable.dto";
import { Responsable } from "../types";
import { prisma } from "@/lib/prisma";

const crearResponsable = async (
  responsable: CrearResponsableDto,
  clienteId: string
): Promise<void> => {
  console.log(clienteId);
  await prisma.responsable.create({
    data: {
      identificacion: responsable.identificacion,
      nombre: responsable.nombre,
      apellido: responsable.apellido,
      cliente_id: clienteId,
    },
  });
};

const obtenerResponsables = (): Promise<Responsable[]> => {
  return prisma.responsable.findMany({});
};
const obtenerResponsableIdent = async (
  identificacion: string,
  clienteId: string
): Promise<Responsable | null> => {
  const res = await prisma.responsable.findUnique({
    where: {
      identificacion: identificacion,
      cliente_id: clienteId,
    },
  });
  return res;
};

const obtenerResponsableID = (id: string, clienteId: string) => {
  return prisma.responsable.findUnique({
    where: {
      id,
      cliente_id: clienteId,
    },
  });
};

export const responsableRepositorio: ResponsableRepositorio = {
  crearResponsable: crearResponsable,
  obtenerResponsables,
  obtenerResponsableIdent: obtenerResponsableIdent,
  obtenerResponsableID: obtenerResponsableID,
};
