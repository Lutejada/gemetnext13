import { prisma } from "@/lib/prisma";
import { ProgramacionPatrones } from "../../domain/entity";
import { ProgramacionPatronesRepositoryRead } from "../../domain/repository/indext";
import { Actividad } from "../../../actividad/dominio/index";
import { Cliente } from "@/app/api/cliente/dominio";
import { Patron } from "../../../patrones/dominio";
import { Frecuencia } from "@/app/api/frecuencia/dominio";

export class ProgramacionPatronesRepositoryReadImp
  implements ProgramacionPatronesRepositoryRead
{
  async obtenerProgramacionPorId(
    ID: string,
    clienteId: string
  ): Promise<ProgramacionPatrones | null> {
    const res = await prisma.programacionPatrones.findUnique({
      where: {
        id: ID,
        clienteId,
      },
    });
    if (!res) {
      return null;
    }
    return new ProgramacionPatrones({
      id: res.id,
      actividad: new Actividad(),
      cliente: new Cliente(),
      patron: new Patron(),
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
  ): Promise<ProgramacionPatrones[]> {
    const res = await prisma.programacionPatrones.findMany({
      where: {
        clienteId,
        actividadId,
        frecuenciaId,
      },
    });
    return res.map(
      (e) =>
        new ProgramacionPatrones({
          id: e.id,
          actividad: new Actividad(),
          cliente: new Cliente(),
          patron: new Patron(),
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
  ): Promise<ProgramacionPatrones[]> {
    const res = await prisma.programacionPatrones.findMany({
      where: {
        clienteId: clienteId,
        estado: "PENDIENTE",
      },
      include: {
        actividad: true,
        patron: true,
        frecuencia: true,
      },
    });

    return res.map(
      (e) =>
        new ProgramacionPatrones({
          id: e.id,
          actividad: {
            id: e.actividad.id,
            cliente_id: clienteId,
            descripcion: e.actividad.descripcion,
            fecha_actualizacion: e.actividad.fecha_actualizacion,
            fecha_creacion: e.fechaCreacion,
            fecha_inactivacion: e.fechaInactivacion,
          },
          cliente: new Cliente(),
          patron: {
            codigo: e.patron.codigo,
            descripcion: e.patron.descripcion,
            id: e.patron.id,
            fecha_actualizacion: e.patron.fecha_actualizacion,
            fecha_creacion: e.patron.fecha_creacion,
            modelo: e.patron.modelo,
            serie: e.patron.serie,
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
