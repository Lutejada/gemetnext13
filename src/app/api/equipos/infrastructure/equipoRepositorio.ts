import { prisma } from "@/src/lib/prisma";
import {
  DatosComplementariosEquipo,
  DatosMetrologicosEquipos,
  Equipo,
} from "../dominio";
import { CrearEquipoDto } from "../application/dtos/crearEquipo.dto";
import { EquipoRepositorio } from "../dominio/repository/index";
import { CrearDatosMetrologicosDto } from "../application/dtos/crearDatosMetrologicos.dto";
import { CrearDatosComplementariosDto } from "../application/dtos/crearDatosComplementarios.dto";
import { CrearProgramacionEquipoDto } from "../application/dtos/crearProgramation.dto";
import { EditarDatosMetrologicosDto } from "../application/dtos/editarDatosMetrologicos.dto";
import { EditarDatosComplementariosDto } from "../application/dtos/editarDatosComplementarios.dto";
import { format } from "date-fns";
import { queryValuesDTO } from "../../common/types";
import { calcularPagina } from "@/lib/pagination";
import { ObtenerEquiposDtoOutput } from "../application/dtos/obtenerEquipos.dto.output";
import { Prisma } from "@prisma/client";
import { EquipoProgramacionDto } from "../../programacion-equipos/application/dto/listadoPatronesProgramados.dto";

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
  crearEquipo: async function (
    dto: CrearEquipoDto,
    clienteId: string
  ): Promise<void> {
    await prisma.equipo.create({
      data: {
        codigo: dto.codigo,
        descripcion: dto.descripcion,
        modelo: dto.modelo,
        serie: dto.serie,
        marca_id: dto.marcaId,
        ubicacion_id: dto.ubicacionId,
        cliente_id: clienteId,
      },
    });
  },
  crearDatosMetrologicos: function (
    dto: CrearDatosMetrologicosDto,
    equipoId: string,
    clienteId: string
  ): Promise<DatosMetrologicosEquipos> {
    return prisma.datos_metrologicos_equipos.create({
      data: {
        equipo_id: equipoId,
        division_escala: dto.divisionEscala,
        rango_maximo: dto.rangoMaximo,
        emp: dto.emp,
        rango_minimo: dto.rangoMinimo,
        resolucion: dto.resolucion,
        cliente_id: clienteId,
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
    dto: CrearDatosComplementariosDto,
    clienteId: string
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
        cliente_id: clienteId,
      },
    });
  },
  crearProgramacionEquipo: async function (
    dto: CrearProgramacionEquipoDto[],
    clienteId: string
  ): Promise<void> {
    await prisma.programacionEquipos.createMany({
      data: dto.map((e) => ({
        actividadId: e.actividadId,
        clienteId: clienteId,
        equipoId: e.equipoId,
        fechaProgramacion: e.fechaProgramacion,
        frecuenciaId: e.frecuenciaId,
      })),
    });
  },
  obtenerEquipos: async function (
    clienteId: string,
    page: number
  ): Promise<ObtenerEquiposDtoOutput> {
    const { skip, porPagina } = calcularPagina(page);
    const equipos = await prisma.equipo.findMany({
      where: { cliente_id: clienteId },
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
  obtenerEquiposPorCodigo: async function (codigo: string, clienteId: string) {
    const equipos = await prisma.equipo.findMany({
      where: {
        cliente_id: clienteId,
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
  editarEquipo: async (
    codigo: string,
    equipo: Partial<Equipo>,
    clienteId: string
  ) => {
    await prisma.equipo.update({
      where: {
        codigo,
        cliente_id: clienteId,
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
  obtenerEquiposPorMarca: function (marca: string, clienteId: string) {
    return prisma.equipo.findMany({
      where: {
        cliente_id: clienteId,
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
    dto: EditarDatosMetrologicosDto,
    clienteId: string
  ) {
    await prisma.datos_metrologicos_equipos.update({
      where: {
        equipo_id: equipoId,
        cliente_id: clienteId,
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
    dto: EditarDatosComplementariosDto,
    clienteId: string
  ) {
    await prisma.datos_complementarios_equipo.update({
      where: {
        equipo_id: equipoId,
        cliente_id: clienteId,
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

  listarEquiposProgramados: async (
    clienteId: string,
    dto?: queryValuesDTO
  ) => {
    const { skip, porPagina } = calcularPagina(dto?.page ?? 1);

    const equipoProgramacion = await prisma.programacionEquipos.findMany({
      where: { clienteId: clienteId },
      take: porPagina,
      skip,
      orderBy: {
        fechaProgramacion: "asc",
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

    const countNextPage = await prisma.programacionEquipos.count({
      take: porPagina,
      skip,
    });

    const existeSiguientePagina = countNextPage === 0 ? true : false;

    const listadoProgramacion = equipoProgramacion.map<EquipoProgramacionDto>(
      (element) => ({
        codigo: element.equipo.codigo,
        actividad: element.actividad.descripcion,
        descripcion: element.equipo.descripcion,
        fechaProgramacion: format(element.fechaProgramacion, "dd-MM-yyyy"),
        frecuencia: element.frecuencia.descripcion,
        alertaEstado: element.estado,
        id: element.id,
      })
    );
    return {
      equiposProgramados: listadoProgramacion,
      existeSiguientePagina: existeSiguientePagina,
    };
  },
};
