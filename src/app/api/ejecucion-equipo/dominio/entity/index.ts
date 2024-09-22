import { Responsable } from "@/app/api/responsables/domain/entity";
import { Cliente } from "../../../cliente/dominio";

export class EjecucionEquipo {
  id: string;
  fechaEjecucion: Date | string;
  observaciones: string;
  cliente: Cliente;
  responsable: Responsable;

  constructor(attributes: EjecucionEquipo) {
    this.id = attributes.id;
    this.fechaEjecucion = attributes.fechaEjecucion;
    this.observaciones = attributes.observaciones;
    this.cliente = attributes.cliente;
    this.responsable = attributes.responsable;
  }
}
