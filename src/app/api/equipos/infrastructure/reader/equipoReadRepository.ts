import { prisma } from "@/lib/prisma";
import { EstadoProgramacion, ProgramacionEquipos } from "../../dominio";
import { EquipoReadRepository } from "../../dominio/repository/index";
export class EquipoReadRepositoryImp implements EquipoReadRepository {
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
