import { prisma } from "@/lib/prisma";
import { ProgramacionPatrones } from "../../domain/entity";
import { ProgramacionPatronesRepositoryWrite } from "../../domain/repository/indext";

export class ProgramacionPatronesWriteRepoImp
  implements ProgramacionPatronesRepositoryWrite
{
  async crearProgramaciones(
    clienteId: string,
    programacionesPatrones: ProgramacionPatrones[]
  ): Promise<void> {
    await prisma.programacionPatrones.createMany({
      data: programacionesPatrones.map((e) => ({
        actividadId: e.actividad.id,
        clienteId: clienteId,
        fechaProgramacion: e.fechaProgramacion,
        frecuenciaId: e.frecuencia.id,
        patronId: e.patron.id,
      })),
    });
  }
}
