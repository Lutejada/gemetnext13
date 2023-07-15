import { prisma } from "@/src/lib/prisma";
import { Patron } from "../dominio";
import { CrearPatronDto } from "../dtos/crear";
import { PatronRepositorio } from "./index";
export const patronRepositorio: PatronRepositorio = {
  crearPatron: async function (dto: CrearPatronDto): Promise<Patron> {
    return prisma.patrones.create({
      data: {
        codigo: dto.codigo,
        descripcion: dto.descripcion,
        modelo: dto.modelo,
        serie: dto.serie,
        marca_id: dto.marcaId,
        ubicacionId: dto.ubicacionId,
      },
    });
  },
  obtenerPatronPorCodigo: function (codigo: string): Promise<Patron | null> {
    return prisma.patrones.findUnique({
      where: {
        codigo,
      },
    });
  },
};
