import { prisma } from "@/lib/prisma";
import { Equipo, EstadoProgramacion, ProgramacionEquipos } from "../../dominio";
import { EquipoReadRepository } from "../../dominio/repository/index";
import { EquipoEntity } from "../../dominio/entity";
import { PaginationOptions } from "@/app/api/common/types";
export class EquipoReadRepositoryImp implements EquipoReadRepository {
  async totalEquiposPorTermino(
    clienteId: string,
    termino: string,
    value: string
  ): Promise<number> {
    return prisma.equipo.count({
      where: {
        cliente_id: clienteId,
        [termino]: {
          contains: value,
        },
      },
    });
  }
  async obtenerEquiposPorTermino(
    clienteId: string,
    termino: string,
    valor: string,
    paginationOptions: PaginationOptions
  ): Promise<EquipoEntity[]> {
    const res = await prisma.equipo.findMany({
      skip: paginationOptions.page,
      take: paginationOptions.limit,
      where: {
        [termino]: {
          contains: valor,
        },
        cliente_id: clienteId,
      },
      include: {
        marca: true,
        ubicacion: {
          include: {
            responsable: true,
          },
        },
      },
    });

    return res.map(
      (e) =>
        new EquipoEntity({
          id: e.id,
          codigo: e.codigo,
          descripcion: e.descripcion,
          modelo: e.modelo,
          fechaCreacion: e.fecha_creacion,
          serie: e.serie,
          marca: e.marca,
          ubicacion: {
            ...e.ubicacion,
            responsable: {
              ...e.ubicacion.responsable,
              identificacion: e.ubicacion.responsable.identificacion,
              nombre: e.ubicacion.responsable.nombre,
              apellido: e.ubicacion.responsable.apellido,
            },
          },
        })
    );
  }
  async totalEquipos(clienteId: string): Promise<number> {
    return prisma.equipo.count({
      where: {
        cliente_id: clienteId,
      },
    });
  }
  async listarEquipos(
    clienteId: string,
    page: number,
    limit: number
  ): Promise<EquipoEntity[]> {
    const res = await prisma.equipo.findMany({
      where: {
        cliente_id: clienteId,
      },
      orderBy: {
        fecha_creacion: "desc",
      },
      take: limit,
      skip: page,
      include: {
        marca: true,
        ubicacion: {
          include: {
            responsable: true,
          },
        },
      },
    });

    return res.map(
      (e) =>
        new EquipoEntity({
          id: e.id,
          codigo: e.codigo,
          descripcion: e.descripcion,
          modelo: e.modelo,
          fechaCreacion: e.fecha_creacion,
          serie: e.serie,
          marca: e.marca,
          ubicacion: {
            ...e.ubicacion,
            responsable: {
              ...e.ubicacion.responsable,
              identificacion: e.ubicacion.responsable.identificacion,
              nombre: e.ubicacion.responsable.nombre,
              apellido: e.ubicacion.responsable.apellido,
            },
          },
        })
    );
  }
  async obtenerPorID(ID: string, clienteID: string): Promise<Equipo | null> {
    const res = await prisma.equipo.findFirst({
      where: {
        cliente_id: clienteID,
        id: ID,
      },
    });

    if (!res) {
      return null;
    }

    return new Equipo({
      cliente_id: clienteID,
      codigo: res.codigo,
      descripcion: res.descripcion,
      fecha_actualizacion: res.fecha_actualizacion,
      fecha_creacion: res.fecha_creacion,
      id: res.id,
      marca_id: res.marca_id,
      modelo: res.modelo,
      serie: res.serie,
      ubicacion_id: res.ubicacion_id,
    });
  }
  async obtenerProgramacionPorId(
    id: string,
    clienteId: string
  ): Promise<ProgramacionEquipos | null> {
    const res = await prisma.programacionEquipos.findUnique({
      where: {
        id,
        clienteId,
      },
    });
    if (!res) {
      return null;
    }
    return new ProgramacionEquipos({
      fechaActualizacion: res?.fechaActualizacion,
      fechaCreacion: res?.fechaCreacion,
      fechaProgramacion: res?.fechaProgramacion,
      id: res?.id,
      fechaInactivacion: res?.fechaInactivacion,
      estado: res.estado as EstadoProgramacion,
    });
  }
  async listarEquiposProgramadosPorVencer(
    clienteId: string
  ): Promise<ProgramacionEquipos[]> {
    const programacion = await prisma.programacionEquipos.findMany({
      where: {
        clienteId: clienteId,
        estado: "PENDIENTE",
      },
      orderBy: {
        fechaProgramacion: "asc",
      },
      include: {
        actividad: true,
        frecuencia: true,
        equipo: true,
      },
    });
    return programacion.map(
      (e) =>
        new ProgramacionEquipos({
          id: e.id,
          frecuencia: e.frecuencia,
          fechaActualizacion: e.fechaActualizacion,
          fechaCreacion: e.fechaCreacion,
          fechaProgramacion: e.fechaProgramacion,
          equipo: e.equipo,
          actividad: e.actividad,
          fechaInactivacion: e.fechaInactivacion,
          estado: e.estado as EstadoProgramacion,
        })
    );
  }
}
