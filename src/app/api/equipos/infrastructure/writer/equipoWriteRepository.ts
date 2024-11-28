import { prisma } from "@/lib/prisma";
import { EquipoWriteRepository } from "../../dominio/repository";
import { EstadoProgramacion } from "@prisma/client";
import { EquipoEntity } from "../../dominio/entity";

export class EquipoWriteRepositoryImp implements EquipoWriteRepository {
  async crearDatosBasicos(
    clienteId: string,
    equipo: EquipoEntity
  ): Promise<void> {
    await prisma.equipo.create({
      data: {
        cliente_id: clienteId,
        codigo: equipo.codigo,
        descripcion: equipo.descripcion,
        modelo: equipo.modelo,
        serie: equipo.serie,
        marca_id: equipo.marca.id,
        ubicacion_id: equipo.ubicacion.id,
      },
    });
  }
  async cambiarProgramacionEstado(
    id: string,
    clienteId: string,
    estadoProgramacion: EstadoProgramacion
  ): Promise<void> {
    await prisma.programacionEquipos.update({
      where: {
        clienteId,
        id,
      },
      data: {
        estado: estadoProgramacion,
      },
    });
  }
}
