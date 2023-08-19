import { prisma } from "@/src/lib/prisma";
import { DatosMetrologicosPatrones, Patron } from "../dominio";
import { CrearPatronDto } from "../dtos/crearPatrones";
import { PatronRepositorio } from "./index";
import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos";
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
      include: {
        datos_metrologicos: true,
      },
    });
    return patron;
  },
  crearDatosMetrologicos: function (
    dto: CrearDatosMetrologicosDto,
    patronId: string
  ): Promise<DatosMetrologicosPatrones> {
    return prisma.datos_metrologicos_patrones.create({
      data: {
        division_escala: dto.divisionEscala,
        rango_maximo: dto.rangoMaximo,
        emp: dto.emp,
        rango_minimo: dto.rangoMinimo,
        resolucion: dto.resolucion,
        patrones_id: patronId,
        valor_nominal: dto.valorNominal,
      },
    });
  },
};
