import { PrismaClient } from "@prisma/client";
import { EquipoRepositorio } from "../dominio/repositorio";

export function equipoRespositoryImpl(): EquipoRepositorio {
  return {
    obtenerEquipoPorId,
  };
}

export const obtenerEquipoPorId = async (id: string) => {
  const prisma = new PrismaClient();
  const equipo = await prisma.equipo.findFirst({
    where: {
      id,
    },
  })
  return equipo; 
};
