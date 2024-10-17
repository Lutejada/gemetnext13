import { Actividad } from "@/app/api/actividad/dominio";
import { Equipo } from "@/app/api/equipos/dominio";
import { Frecuencia } from "@/app/api/frecuencia/dominio";
import { EstadoProgramacion } from "@prisma/client";

export class ProgramacionEquipos {
  id: string;
  equipo?: Equipo;
  actividad?: Actividad;
  frecuencia?: Frecuencia;
  fechaProgramacion: Date | string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  fechaInactivacion?: Date | null;
  estado?: EstadoProgramacion;
  constructor(attributes: ProgramacionEquipos) {
    this.id = attributes.id;
    this.equipo = attributes.equipo;
    this.actividad = attributes.actividad;
    this.frecuencia = attributes.frecuencia;
    this.fechaProgramacion = attributes.fechaProgramacion;
    this.fechaCreacion = attributes.fechaCreacion;
    this.fechaActualizacion = attributes.fechaActualizacion;
    this.fechaInactivacion = attributes.fechaInactivacion;
    this.estado = attributes.estado;
  }
}
