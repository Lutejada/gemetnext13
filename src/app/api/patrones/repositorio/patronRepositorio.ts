import { prisma } from "@/src/lib/prisma";
import {
  DatosComplementariosPatrones,
  DatosMetrologicosPatrones,
  Patron,
} from "../dominio";
import { CrearPatronDto } from "../dtos/crearPatrones";
import { PatronRepositorio } from "./index";
import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos";
import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";
import { ObtenerDatosDto } from "../../common/types";
import {
  ObtenerPatronesDtoOutput,
  PatronesResponse,
} from "../dtos/obtenerPatrones.dto.output";
import { calcularPagina } from "@/lib/queryUtils";
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
        datos_complementarios: true,
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
  crearDatosComplementarios: function (
    patronId: string,
    dto: CrearDatosComplementariosDto
  ): Promise<DatosComplementariosPatrones> {
    return prisma.datos_complementarios_patrones.create({
      data: {
        fireware: dto.fireware,
        cumple_especificacion_instalaciones:
          dto.cumpleEspecificacionInstalaciones,
        descripcion_especificaciones: dto.descripcionEspecificaciones,
        descripcion_software: dto.descripcionSoftware,
        observaciones: dto.observaciones,
        utiliza_software: dto.utilizaSoftware,
        version_software: dto.versionSoftware,
        patron_id: patronId,
      },
    });
  },
  obtenerPatrones: async function (
    dto?: ObtenerDatosDto | undefined
  ): Promise<ObtenerPatronesDtoOutput> {
    const { porPagina, skip } = calcularPagina(dto?.page ?? 1);
    const dbResponse = await prisma.patrones.findMany({
      orderBy: {
        fecha_creacion: "desc",
      },
      take: porPagina,
      skip,
      select: {
        id: true,
        codigo: true,
        descripcion: true,
        marca: {
          select: {
            descripcion: true,
          },
        },
        ubicacion: {
          select: {
            responsable: {
              select: {
                nombre: true,
              },
            },
          },
        },
      },
    });
    const patrones = dbResponse.map<PatronesResponse>((patron) => ({
      codigo: patron.codigo,
      descripcion: patron.descripcion,
      id: patron.id,
      marca: patron.marca.descripcion,
      responsable: patron.ubicacion.responsable.nombre,
    }));

    const countNextPage = await prisma.programacion_equipos.count({
      take: porPagina,
      skip,
    });

    const existeSiguientePagina = countNextPage === 0 ? true : false;

    return {
      patrones: patrones,
      existeSiguientePagina,
    };
  },
};
