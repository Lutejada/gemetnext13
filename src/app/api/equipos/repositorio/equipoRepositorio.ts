import { prisma } from "@/src/lib/prisma";
import { DatosMetrologicosEquipos, Equipo } from "../dominio";
import { CrearEquipoDto } from "../dtos/crearEquipo.dto";
import { EquipoRepositorio } from "./index";
import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos.dto";
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
  obtenerEquiporPorCodigo: function (codigo: string): Promise<Equipo | null> {
    return prisma.equipo.findUnique({
      where: {
        codigo,
      },
    });
  },
  obtenerEquipoPorId: async function (id: string): Promise<Equipo | null> {
    return prisma.equipo.findUnique({
      where: {
        id,
      },
    });
  },
};
