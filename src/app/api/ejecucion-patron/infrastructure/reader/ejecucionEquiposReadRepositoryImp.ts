import { prisma } from "@/lib/prisma";
import { Documentos, EjecucionPatron } from "../../dominio/entity";
import { EjecucionPatronReadRepository } from "../../dominio/repository";

import { Responsable } from "@/app/api/responsables/domain/entity";
import { EstadoProgramacion } from "../../../equipos/dominio/index";
import { ProgramacionPatrones } from "@/app/api/programacion-patrones/domain/entity";
import { Patron } from "@/app/api/patrones/dominio";
import { Cliente } from "@/app/api/cliente/dominio";
import { Frecuencia } from "@/app/api/frecuencia/dominio";
import { Actividad } from "@/app/api/actividad/dominio";

export class EjecucionPatronesReadRepositoryImp
  implements EjecucionPatronReadRepository
{
  async listar(clienteId: string): Promise<EjecucionPatron[]> {
    const res = await prisma.ejecucionPatrones.findMany({
      where: { clienteId },
      include: {
        programacionPatron: {
          include: {
            patron: true,
          },
        },
        responsable: true,
      },
    });

    return res.map(
      (res) =>
        new EjecucionPatron({
          id: res.id,
          fechaEjecucion: res.fechaEjecucion,
          observaciones: res.observaciones,
          cliente: { id: clienteId, nombre: clienteId },
          documentos: res.documentos as Documentos[],
          programacionPatron: new ProgramacionPatrones({
            id: res.programacionPatron.id,
            estado: res.programacionPatron.estado as EstadoProgramacion,
            fechaActualizacion: res.programacionPatron.fechaActualizacion,
            fechaCreacion: res.programacionPatron.fechaCreacion,
            fechaProgramacion: res.programacionPatron.fechaProgramacion,
            patron: new Patron({
              id: res.programacionPatron.patron.id,
              descripcion: res.programacionPatron.patron.descripcion,
              codigo: res.programacionPatron.patron.codigo,
              modelo: res.programacionPatron.patron.modelo,
              fecha_actualizacion:
                res.programacionPatron.patron.fecha_actualizacion,
              fecha_creacion: res.programacionPatron.patron.fecha_creacion,
              serie: res.programacionPatron.patron.serie,
              marca_id: res.programacionPatron.patron.marca_id,
              ubicacionId: res.programacionPatron.patron.ubicacionId,
            }),
            actividad: new Actividad(),
            cliente: new Cliente(),
            frecuencia: new Frecuencia(),
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
