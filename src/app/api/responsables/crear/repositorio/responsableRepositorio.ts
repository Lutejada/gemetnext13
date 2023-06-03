import { PrismaClient } from "@prisma/client";
import { ResponsableRepositorio } from ".";
import { crearResponsableDto } from "../dtos/crearResponsable.dto";

const crearResponsable = async (responsable:crearResponsableDto): Promise<void> => {
    const prisma = new PrismaClient();
    await prisma.responsable.create({
        data: {
          alias: responsable.alias,
          nombre: responsable.nombre,
        },
      });
};

export const responsableRepositorio:ResponsableRepositorio = {
  crearResponsable:crearResponsable
};

