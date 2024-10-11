import { Actividad } from "@/app/api/actividad/dominio";
import { Cliente } from "@/app/api/cliente/dominio";
import { Frecuencia } from "@/app/api/frecuencia/dominio";
import { Patron } from "@/app/api/patrones/dominio";

export class ProgramacionPatrones {
  id: string;
  actividad: Actividad;
  frecuencia: Frecuencia;
  patron: Patron;
  fechaProgramacion: Date | string;
  fechaCreacion: Date | string;
  fechaActualizacion: Date | string;
  fechaInactivacion?: Date | string | null;
  cliente: Cliente;

  constructor(attributes: ProgramacionPatrones) {
    this.id = attributes.id;
    this.actividad = attributes.actividad;
    this.frecuencia = attributes.frecuencia;
    this.patron = attributes.patron;
    this.fechaProgramacion = attributes.fechaProgramacion;
    this.fechaCreacion = attributes.fechaCreacion;
    this.fechaActualizacion = attributes.fechaActualizacion;
    this.fechaInactivacion = attributes.fechaInactivacion;
    this.cliente = attributes.cliente;
  }
}
