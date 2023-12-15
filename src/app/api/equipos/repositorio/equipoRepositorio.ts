import { prisma } from "@/src/lib/prisma";
import {
  DatosComplementariosEquipo,
  DatosMetrologicosEquipos,
  Equipo,
  ProgramacionEquipos,
} from "../dominio";
import { CrearEquipoDto } from "../dtos/crearEquipo.dto";
import { EquipoRepositorio } from "./index";
import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos.dto";
import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";
import { CrearProgramacionEquipoDto } from "../dtos/crearProgramation.dto";
import { EditarDatosMetrologicosDto } from "../dtos/editarDatosMetrologicos.dto";
import { EditarDatosComplementariosDto } from "../dtos/editarDatosComplementarios.dto";
import { format } from "date-fns";

const selectEquipoBasico = {
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
};

export const equipoRepositorio: EquipoRepositorio = {
  crearEquipo: function (dto: CrearEquipoDto): Promise<Equipo> {
    return prisma.equipo.create({
      data: {
        codigo: dto.codigo,
        descripcion: dto.descripcion,
        modelo: dto.modelo,
        serie: dto.serie,
        marca_id: dto.marcaId,
        ubicacion_id: dto.ubicacionId,
      },
    });
  },
  crearDatosMetrologicos: function (
    dto: CrearDatosMetrologicosDto,
    equipoId: string
  ): Promise<DatosMetrologicosEquipos> {
    return prisma.datos_metrologicos_equipos.create({
      data: {
        equipo_id: equipoId,
        division_escala: dto.divisionEscala,
        rango_maximo: dto.rangoMaximo,
        emp: dto.emp,
        rango_minimo: dto.rangoMinimo,
        resolucion: dto.resolucion,
      },
    });
  },
  obtenerEquipoPorCodigo: async function (
    codigo: string
  ): Promise<Equipo | null> {
    const equipo = await prisma.equipo.findUnique({
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
    return equipo;
  },
  obtenerEquipoPorId: async function (id: string): Promise<Equipo | null> {
    return prisma.equipo.findUnique({
      where: {
        id,
      },
    });
  },
  crearDatosComplementarios: function (
    equipoId: string,
    dto: CrearDatosComplementariosDto
  ): Promise<DatosComplementariosEquipo> {
    return prisma.datos_complementarios_equipo.create({
      data: {
        fireware: dto.fireware,
        cumple_especificacion_instalaciones:
          dto.cumpleEspecificacionInstalaciones,
        descripcion_especificaciones: dto.descripcionEspecificaciones,
        descripcion_software: dto.descripcionSoftware,
        observaciones: dto.observaciones,
        equipo_id: equipoId,
        utiliza_software: dto.utilizaSoftware,
        version_software: dto.versionSoftware,
      },
    });
  },
  crearProgramacionEquipo: function (
    dto: CrearProgramacionEquipoDto
  ): Promise<ProgramacionEquipos> {
    return prisma.programacion_equipos.create({
      data: {
        equipo_id: dto.equipoId,
        frecuencia_id: dto.frecuenciaId,
        fecha_programacion: dto.fechaProgramacion,
        actividad_id: dto.actividadId,
      },
    });
  },
  obtenerEquipos: async function (page: number) {
    console.log(page);
    const currentPage = Math.max(Number(page), 1);
    const porPagina = 5;
    const skip = (currentPage - 1) * porPagina;
    const equipos = await prisma.equipo.findMany({
      orderBy: {
        fecha_creacion: "desc",
      },
      select: selectEquipoBasico,
      skip: skip,
      take: 5,
    });

    const nextpagecount = await prisma.equipo.count({
      skip: skip + porPagina,
      take: 5,
    });

    console.log({ nextpagecount });
    const existeSiguientePagina = nextpagecount !== 0 ? true : false;

    return {
      equipos: equipos.map((equipo) => ({
        id: equipo.id,
        descripcion: equipo.descripcion,
        marca: equipo.marca.descripcion,
        responsable: equipo.ubicacion.responsable.nombre,
        codigo: equipo.codigo,
      })),
      existeSiguientePagina,
    };
  },
  obtenerEquiposPorCodigo: async function (codigo: string) {
    const equipos = await prisma.equipo.findMany({
      where: {
        codigo: {
          contains: codigo,
        },
      },
      select: selectEquipoBasico,
    });
    return equipos.map((equipo) => ({
      id: equipo.id,
      descripcion: equipo.descripcion,
      marca: equipo.marca.descripcion,
      responsable: equipo.ubicacion.responsable.nombre,
      codigo: equipo.codigo,
    }));
  },
  editarEquipo: async (codigo: string, equipo: Partial<Equipo>) => {
    await prisma.equipo.update({
      where: {
        codigo,
      },
      data: {
        marca_id: equipo.marca_id,
        descripcion: equipo.descripcion,
        ubicacion_id: equipo.ubicacion_id,
        serie: equipo.serie,
        modelo: equipo.modelo,
      },
    });
  },
  obtenerEquiposPorMarca: function (marca: string) {
    return prisma.equipo.findMany({
      where: {
        marca: {
          descripcion: {
            contains: marca,
          },
        },
      },
      select: {
        id: true,
        codigo: true,
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
  },

  editarDatosMetrologicos: async function (
    equipoId: string,
    dto: EditarDatosMetrologicosDto
  ) {
    await prisma.datos_metrologicos_equipos.update({
      where: {
        equipo_id: equipoId,
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
    equipoId: string,
    dto: EditarDatosComplementariosDto
  ) {
    await prisma.datos_complementarios_equipo.update({
      where: {
        equipo_id: equipoId,
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

  listarEquiposProgramados: async (limit = 10) => {
    const equipoProgramacion = await prisma.programacion_equipos.findMany({
      take: limit,
      orderBy: {
        fecha_creacion: "desc",
      },
      include: {
        equipo: {
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
    const listadoProgramacion =
      equipoProgramacion.map<ListaProgramacionEquiposDTO>((element) => ({
        codigo: element.equipo.codigo,
        actividad: element.actividad.descripcion,
        descripcion: element.equipo.descripcion,
        fechaProgramacion: format(element.fecha_programacion, "dd-MM-yyyy"),
        frecuencia: element.frecuencia.descripcion,
      }));
    return listadoProgramacion;
  },
};
