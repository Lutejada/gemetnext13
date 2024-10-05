import { prisma } from "@/lib/prisma";
import { EjecucionEquipo } from "../../dominio/entity";
import { EjecucionEquipoReadRepository } from "../../dominio/repository";
import { Cliente } from "../../../cliente/dominio/index";
import {
  EstadoProgramacion,
  ProgramacionEquipos,
} from "@/app/api/equipos/dominio";
import { Responsable } from "@/app/api/responsables/domain/entity";
import { Equipo } from "../../../equipos/dominio/index";

export class EjecucionEquiposReadRepositoryImp
  implements EjecucionEquipoReadRepository
{
  async listar(clienteId: string): Promise<EjecucionEquipo[]> {
    const res = await prisma.ejecucionEquipos.findMany({
      where: { clienteId },
      include: {
        programacionEquipo: {
          include: {
            equipo: true,
          },
        },
        responsable: true,
      },
    });

    return res.map(
      (res) =>
        new EjecucionEquipo({
          id: res.id,
          fechaEjecucion: res.fechaEjecucion,
          observaciones: res.observaciones,
          cliente: { id: clienteId, nombre: clienteId },
          programacionEquipo: new ProgramacionEquipos({
            id: res.programacionEquipo.id,
            estado: res.programacionEquipo.estado as EstadoProgramacion,
            fechaActualizacion: res.programacionEquipo.fechaActualizacion,
            fechaCreacion: res.programacionEquipo.fechaCreacion,
            fechaProgramacion: res.programacionEquipo.fechaProgramacion,
            equipo: new Equipo({
              id: res.programacionEquipo.equipo.id,
              descripcion: res.programacionEquipo.equipo.descripcion,
              codigo: res.programacionEquipo.equipo.codigo,
              cliente_id: clienteId,
              modelo: res.programacionEquipo.equipo.modelo,
              fecha_actualizacion:
                res.programacionEquipo.equipo.fecha_actualizacion,
              fecha_creacion: res.programacionEquipo.equipo.fecha_creacion,
              serie: res.programacionEquipo.equipo.serie,
              marca_id: res.programacionEquipo.equipo.marca_id,
              ubicacion_id: res.programacionEquipo.equipo.ubicacion_id,
            }),
          }),
          responsable: new Responsable({
            id: res.responsable.id,
            apellido: res.responsable.apellido,
            identificacion: res.responsable.identificacion,
            nombre: res.responsable.nombre,
          }),
        })
    );
  }
}
