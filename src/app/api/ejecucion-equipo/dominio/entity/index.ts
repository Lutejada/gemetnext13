import { Responsable } from "@/app/api/responsables/domain/entity";
import { Cliente } from "../../../cliente/dominio";
import { ProgramacionEquipos } from "@/app/api/equipos/dominio";

export interface Documentos {
  name?: string;
  url?: string;
}

export class EjecucionEquipo {
  id: string;
  fechaEjecucion: Date | string;
  observaciones: string;
  cliente: Cliente;
  responsable: Responsable;
  programacionEquipo: ProgramacionEquipos;
  documentos?: Documentos[]

  constructor(attributes: EjecucionEquipo) {
    this.id = attributes.id;
    this.fechaEjecucion = attributes.fechaEjecucion;
    this.observaciones = attributes.observaciones;
    this.cliente = attributes.cliente;
    this.responsable = attributes.responsable;
    this.programacionEquipo = attributes.programacionEquipo;
    this.documentos = attributes.documentos ?? [];
  }
}
