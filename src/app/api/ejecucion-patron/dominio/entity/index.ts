import { Responsable } from "@/app/api/responsables/domain/entity";
import { Cliente } from "../../../cliente/dominio/entity";
import { ProgramacionPatrones } from "@/app/api/programacion-patrones/domain/entity";
import { Documentos } from "@/app/api/common/types";


export class EjecucionPatron {
  id: string;
  fechaEjecucion: Date | string;
  observaciones: string;
  cliente: Cliente;
  responsable: Responsable;
  programacionPatron: ProgramacionPatrones;
  documentos?: Documentos[]

  constructor(attributes: EjecucionPatron) {
    this.id = attributes.id;
    this.fechaEjecucion = attributes.fechaEjecucion;
    this.observaciones = attributes.observaciones;
    this.cliente = attributes.cliente;
    this.responsable = attributes.responsable;
    this.programacionPatron = attributes.programacionPatron;
    this.documentos = attributes.documentos ?? [];
  }
}
