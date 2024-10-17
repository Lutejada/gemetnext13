import { prisma } from "@/lib/prisma";
import { ProgramacionPatrones } from "../../domain/entity";
import { ProgramacionPatronesRepositoryWrite } from "../../domain/repository/indext";
import { EstadoProgramacion } from "@/app/api/equipos/dominio";

export class ProgramacionPatronesWriteRepoImp
  implements ProgramacionPatronesRepositoryWrite
{
  async cambiarProgramacionEstado(
    id: string,
    clienteId: string,
    estado: EstadoProgramacion
  ): Promise<void> {
    prisma.programacionPatrones.update({
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
