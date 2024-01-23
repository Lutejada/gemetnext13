import { prisma } from "@/src/lib/prisma";
import { Frecuencia } from "../dominio";
import { CrearFrecuenciaDto } from "../dtos/crear";
import { FrecuenciaRepositorio } from "./index";
export const frecuenciaRepositorio: FrecuenciaRepositorio = {
  crearFrecuencia: function (
    dto: CrearFrecuenciaDto,
    clienteId: string
  ): Promise<Frecuencia> {
    return prisma.frecuencia.create({
      data: {
        cantidad_dias: dto.cantidadDias,
        descripcion: dto.descripcion,
        cliente_id: clienteId,
      },
    });
  },
  obtenerFrecuencias: function (clienteId: string): Promise<Frecuencia[]> {
    return prisma.frecuencia.findMany({ where: { cliente_id: clienteId } });
  },
};
