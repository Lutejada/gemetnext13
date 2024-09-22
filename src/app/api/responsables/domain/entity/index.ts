import { Cliente } from "@/app/api/cliente/dominio";
import { Ubicacion } from "@/app/api/ubicaciones/types";

export class Responsable {
  id: string;
  identificacion: string;
  nombre: string;
  apellido: string;
  fechaCreacion?: Date;
  ubicacion?: Ubicacion[];
  fechaActualizacion?: Date;
  fechaInactivacion?: Date;
  cliente?: Cliente;

  constructor(attributes: {
    id: string;
    ubicacion?: Ubicacion[]; // Define el tipo específico de 'ubicacion' si lo conoces
    identificacion: string;
    nombre: string;
    apellido: string;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
    fechaInactivacion?: Date;
    cliente?: Cliente;
  }) {
    this.id = attributes.id;
    this.ubicacion = attributes.ubicacion;
    this.identificacion = attributes.identificacion;
    this.nombre = attributes.nombre;
    this.apellido = attributes.apellido;
    this.fechaCreacion = attributes.fechaCreacion;
    this.fechaActualizacion = attributes.fechaActualizacion;
    this.fechaInactivacion = attributes.fechaInactivacion;
    this.cliente = attributes.cliente;
  }
}
