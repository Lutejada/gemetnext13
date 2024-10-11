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
        })
    );
  }
  async listarProgramaciones(
    clienteId: string
  ): Promise<ProgramacionPatrones[] | null> {
    const res = await prisma.programacionPatrones.findMany({
      where: {
        clienteId: clienteId,
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
        })
    );
  }
}
