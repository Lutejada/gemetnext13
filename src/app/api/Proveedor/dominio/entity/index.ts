import { Cliente } from "../../../cliente/dominio";

export enum Identificacion {
  NIT = "NIT",
}

export class Proveedor {
  id: string;
  nombre: string;
  tipoIdetificacion: Identificacion;
  numeroIdentificacion: string;
  direccion: string;
  telefono: number;
  email: string;
  cliente: Cliente;

  constructor(attributes: Partial<Proveedor> = {}) {
    this.id = attributes.id ?? "";
    this.nombre = attributes.nombre ?? "";
    this.tipoIdetificacion = attributes.tipoIdetificacion ?? Identificacion.NIT;
    this.numeroIdentificacion = attributes.numeroIdentificacion ?? "";
    this.direccion = attributes.direccion ?? "";
    this.telefono = attributes.telefono ?? 0;
    this.email = attributes.email ?? "";
    this.cliente = attributes.cliente ?? new Cliente();
  }
}
