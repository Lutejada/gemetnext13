import { prisma } from "@/lib/prisma";
import { ProgramacionEquipos } from "../../domain/entity";
import { ProgramacionEquiposRepositoryWrite } from "../../domain/repository/indext";
import { EstadoProgramacion } from "@/app/api/equipos/dominio";

export class ProgramacionEquiposWriteRepoImp
  implements ProgramacionEquiposRepositoryWrite
{
  async cambiarProgramacionEstado(
    id: string,
    clienteId: string,
    estado: EstadoProgramacion
  ): Promise<void> {
    prisma.programacionEquipos.update({
      where: {
        clienteId,
        id,
      },
      data: {
        estado: estado,
      },
    });
  }
  async crearProgramaciones(
    clienteId: string,
    programacionesEquipos: ProgramacionEquipos[]
  ): Promise<void> {
    await prisma.programacionEquipos.createMany({
      data: programacionesEquipos.map((e) => ({
        actividadId: e.actividad?.id!,
        clienteId: clienteId,
        fechaProgramacion: e.fechaProgramacion,
        frecuenciaId: e.frecuencia?.id!,
        equipoId: e?.equipo?.id!,
      })),
    });
  }
}
