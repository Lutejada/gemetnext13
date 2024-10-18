import { prisma } from "@/lib/prisma";
import { ProgramacionEquipos } from "../../domain/entity";
import { ProgramacionEquiposRepositoryRead } from "../../domain/repository/indext";
import { Actividad } from "../../../actividad/dominio/index";
import { Frecuencia } from "@/app/api/frecuencia/dominio";

export class ProgramacionEquiposRepositoryReadImp
  implements ProgramacionEquiposRepositoryRead
{
  async obtenerProgramacionPorId(
    ID: string,
    clienteId: string
  ): Promise<ProgramacionEquipos | null> {
    const res = await prisma.programacionEquipos.findUnique({
      where: {
        id: ID,
        clienteId,
      },
    });
    if (!res) {
      return null;
    }
    return new ProgramacionEquipos({
      id: res.id,
      actividad: new Actividad(),
      fechaActualizacion: res.fechaActualizacion,
      fechaCreacion: res.fechaActualizacion,
      fechaProgramacion: res.fechaProgramacion,
      frecuencia: new Frecuencia(),
      fechaInactivacion: res.fechaInactivacion,
      estado: res.estado,
    });
  }
  async listaProgramacionesPorFrecuenciaYActividad(
    clienteId: string,
    actividadId: string,
    frecuenciaId: string
  ): Promise<ProgramacionEquipos[]> {
    const res = await prisma.programacionEquipos.findMany({
      where: {
        clienteId,
        actividadId,
        frecuenciaId,
      },
    });
    return res.map(
      (e) =>
        new ProgramacionEquipos({
          id: e.id,
          actividad: new Actividad(),
          fechaActualizacion: e.fechaActualizacion,
          fechaCreacion: e.fechaActualizacion,
          fechaProgramacion: e.fechaProgramacion,
          frecuencia: new Frecuencia(),
          fechaInactivacion: e.fechaInactivacion,
          estado: e.estado,
        })
    );
  }
  async listarProgramaciones(
    clienteId: string
  ): Promise<ProgramacionEquipos[]> {
    const res = await prisma.programacionEquipos.findMany({
      where: {
        clienteId: clienteId,
        estado: "PENDIENTE",
      },
      include: {
        actividad: true,
        equipo: true,
        frecuencia: true,
      },
    });

    return res.map(
      (e) =>
        new ProgramacionEquipos({
          id: e.id,
          actividad: {
            id: e.actividad.id,
            cliente_id: clienteId,
            descripcion: e.actividad.descripcion,
            fecha_actualizacion: e.actividad.fecha_actualizacion,
            fecha_creacion: e.fechaCreacion,
            fecha_inactivacion: e.fechaInactivacion,
          },
          equipo: {
            codigo: e.equipo.codigo,
            descripcion: e.equipo.descripcion,
            id: e.equipo.id,
            fecha_actualizacion: e.equipo.fecha_actualizacion,
            fecha_creacion: e.equipo.fecha_creacion,
            modelo: e.equipo.modelo,
            serie: e.equipo.serie,
            cliente_id: clienteId,
            marca_id: e.equipo.marca_id,
            ubicacion_id: e.equipo.marca_id,
          },
          fechaActualizacion: e.fechaActualizacion,
          fechaCreacion: e.fechaActualizacion,
          fechaProgramacion: e.fechaProgramacion,
          frecuencia: {
            id: e.frecuencia.id,
            cantidad_dias: e.frecuencia.cantidad_dias,
            cliente_id: clienteId,
            descripcion: e.frecuencia.descripcion,
            fecha_actualizacion: e.frecuencia.fecha_actualizacion,
            fecha_creacion: e.frecuencia.fecha_creacion,
          },
          fechaInactivacion: e.fechaInactivacion,
          estado: e.estado,
        })
    );
  }
}
