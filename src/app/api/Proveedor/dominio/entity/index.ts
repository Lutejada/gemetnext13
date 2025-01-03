import { Cliente } from "../../../cliente/dominio/entity";

export enum Identificacion {
  NIT = "NIT",
}

export class Proveedor {
  id: string;
  nombre: string;
  tipoIdetificacion: Identificacion;
  numeroIdentificacion: string;
  direccion: string;
  telefono: string;
  email: string;
  cliente: Cliente;

  constructor(attributes: Partial<Proveedor> = {}) {
    this.id = attributes.id ?? "";
    this.nombre = attributes.nombre ?? "";
    this.tipoIdetificacion = attributes.tipoIdetificacion ?? Identificacion.NIT;
    this.numeroIdentificacion = attributes.numeroIdentificacion ?? "";
    this.direccion = attributes.direccion ?? "";
    this.telefono = attributes.telefono ?? "";
    this.email = attributes.email ?? "";
    this.cliente = attributes.cliente ?? new Cliente();
  }
}
