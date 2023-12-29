import { prisma } from "@/src/lib/prisma";
import {
  DatosComplementariosPatrones,
  DatosMetrologicosPatrones,
  Patron,
  ProgramacionPatrones,
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
import { EditarDatosMetrologicosDto } from "../dtos/editarDatosMetrologicos.dto";
import { EditarDatosComplementariosDto } from "../dtos/editarDatosComplementarios.dto";
import { CrearProgramacionPatronDto } from "../dtos/crearProgramation.dto";
import {
  ListaProgramacionPatronesDTO,
  PatronProgramacionDto,
} from "../dtos/listaProgramacionPatrones.output";
import { format } from "date-fns";
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
        marca: true,
        ubicacion: true,
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
  editarDatosBasicos: async function (
    codigo: string,
    patron: Partial<Patron>
  ): Promise<void> {
    await prisma.patrones.update({
      where: { codigo },
      data: {
        marca_id: patron.marca_id,
        descripcion: patron.descripcion,
        ubicacionId: patron.ubicacionId,
        serie: patron.serie,
        modelo: patron.modelo,
      },
    });
  },
  editarDatosMetrologicos: async function (
    patronId: string,
    dto: EditarDatosMetrologicosDto
  ): Promise<void> {
    await prisma.datos_metrologicos_patrones.update({
      where: {
        patrones_id: patronId,
      },
      data: {
        division_escala: dto.divisionEscala,
        rango_maximo: dto.rangoMaximo,
        rango_minimo: dto.rangoMinimo,
        resolucion: dto.resolucion,
      },
    });
  },
  editarDatosComplementarios: async function (
    patronId: string,
    dto: EditarDatosComplementariosDto
  ): Promise<void> {
    await prisma.datos_complementarios_patrones.update({
      where: {
        patron_id: patronId,
      },
      data: {
        cumple_especificacion_instalaciones:
          dto.cumpleEspecificacionInstalaciones,
        descripcion_especificaciones: dto.descripcionEspecificaciones,
        descripcion_software: dto.descripcionSoftware,
        fireware: dto.fireware,
        utiliza_software: dto.utilizaSoftware,
        observaciones: dto.observaciones,
        version_software: dto.versionSoftware,
      },
    });
  },
  crearProgramacionPatron: function (
    dto: CrearProgramacionPatronDto
  ): Promise<ProgramacionPatrones> {
    return prisma.programacion_patrones.create({
      data: {
        patron_id: dto.patronId,
        frecuencia_id: dto.frecuenciaId,
        fecha_programacion: dto.fechaProgramacion,
        actividad_id: dto.actividadId,
      },
    });
  },
  listarPatronesProgramados: async function (
    dto?: ObtenerDatosDto | undefined
  ): Promise<ListaProgramacionPatronesDTO> {
    const { skip, porPagina } = calcularPagina(dto?.page ?? 1);

    const equipoProgramacion = await prisma.programacion_patrones.findMany({
      take: porPagina,
      skip,
      orderBy: {
        fecha_creacion: "desc",
      },
      include: {
        patron: {
          select: {
            codigo: true,
            descripcion: true,
          },
        },
        actividad: {
          select: {
            descripcion: true,
          },
        },
        frecuencia: {
          select: {
            descripcion: true,
          },
        },
      },
    });

    const countNextPage = await prisma.programacion_patrones.count({
      take: porPagina,
      skip,
    });

    const existeSiguientePagina = countNextPage === 0 ? true : false;

    const listadoProgramacion = equipoProgramacion.map<PatronProgramacionDto>(
      (element) => ({
        codigo: element.patron.codigo,
        actividad: element.actividad.descripcion,
        descripcion: element.patron.descripcion,
        fechaProgramacion: format(element.fecha_programacion, "dd-MM-yyyy"),
        frecuencia: element.frecuencia.descripcion,
      })
    );
    return {
      patronesProgramados: listadoProgramacion,
      existeSiguientePagina: existeSiguientePagina,
    };
  },
};
