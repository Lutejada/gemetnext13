import { prisma } from "@/src/lib/prisma";
import { Patron } from "../dominio";
import { CrearPatronDto } from "../dtos/crear";
import { PatronRepositorio } from "./index";
export const patronRepositorio: PatronRepositorio = {
  crearPatron: async function (dto: CrearPatronDto): Promise<Patron> {
    const patron = await prisma.patrones.create({
      data: {
        codigo: dto.codigo,
        descripcion: dto.descripcion,
        modelo: dto.modelo,
        serie: dto.serie,
        marca_id: dto.marcaId,
        ubicacionId: dto.ubicacionId,
      },
    });
    console.log(patron);
    return patron;
  },
  obtenerPatronPorCodigo: async function (
    codigo: string
  ): Promise<Patron | null> {
    const patron = await prisma.patrones.findUnique({
      where: {
        codigo,
      },
    });
    return patron;
  },
};
