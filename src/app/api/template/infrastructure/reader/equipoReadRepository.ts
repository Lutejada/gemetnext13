import { prisma } from "@/lib/prisma";
import { ProgramacionEquipos } from "../../dominio";
import { EquipoReadRepository } from "../../dominio/repository/index";
export class EquipoReadRepositoryImp implements EquipoReadRepository {
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
        })
    );
  }
}
