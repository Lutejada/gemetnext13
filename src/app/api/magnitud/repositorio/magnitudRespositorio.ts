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
    obtenerMagnitudPorId: function (id: string): Promise<Magnitud> {
        throw new Error("Function not implemented.");
    },
    obtenerTodo: function (): Promise<Magnitud[]> {
        throw new Error("Function not implemented.");
    }
}