import { PrismaClient } from "@prisma/client";
import { EquipoRepositorio } from "../dominio/repositorio";

export function equipoRespositoryImpl(): EquipoRepositorio {
  return {
    obtenerEquipoPorId,
    crearEquipo
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

export const crearEquipo =()=>{
  const prisma = new PrismaClient();
  const equipo  = prisma.equipo.create({
    data:{
      codigo:'112',
      descripcion:'any equi',
      modelo:'2012',
      serie:'abc',
      id:'12164'
    }
  });
  return equipo;
}
