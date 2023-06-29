import { prisma } from "@/src/lib/prisma";
import { MagnitudRepositorio } from ".";
import { Magnitud } from "../dominio";
import { CrearMagnitudDto } from "../dtos/crearMagnitud.dto";

export const magnitudRespositorio:MagnitudRepositorio={
    crearMagnitud: async function (dto: CrearMagnitudDto): Promise<Magnitud> {
        return prisma.magnitud.create({
            data: {
                alias: dto.alias,
                descripcion: dto.descripcion
            }
        });
    },
    obtenerMagnitudPorId: async function (id: string): Promise<Magnitud | null> {
        return prisma.magnitud.findUnique({
            where:{
                id
            }
        })
    },
    obtenerTodo: function (): Promise<Magnitud[]> {
        return prisma.magnitud.findMany()
    }
}