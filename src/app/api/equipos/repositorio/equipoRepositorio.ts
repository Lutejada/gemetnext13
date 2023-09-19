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
  obtenerEquiporPorCodigo: async function (
    codigo: string
  ): Promise<Equipo | null> {
    const equipo = await prisma.equipo.findUnique({
      where: {
        codigo,
      },
      include: {
        datos_metrologicos: true,
        datos_complementarios: true
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
        cumple_especificacion_instalaciones: dto.cumpleEspecificacionInstalaciones,
        descripcion_especificaciones: dto.descripcionEspecificaciones,
        descripcion_software: dto.descripcionSoftware,
        observaciones: dto.observaciones,
        equipo_id: equipoId,
        utiliza_software: dto.utilizaSoftware,
        version_software: dto.versionSoftware,
      },
    });
  },
  crearProgramacionEquipo: function (dto: CrearProgramacionEquipoDto): Promise<ProgramacionEquipos> {
    return prisma.programacion_equipos.create({
      data: {
        equipo_id: dto.equipoId,
        frecuencia_id: dto.frecuenciaId,
        fecha_programacion: dto.fechaProgramacion,
        actividad_id: dto.actividadId
      }
    });
  },
  obtenerEquipos: function (): Promise<Equipo[]> {
    return prisma.equipo.findMany()
  }
};
