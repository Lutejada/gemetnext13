import { Responsable } from "../../../responsables/domain/entity";

export class Ubicacion {
  id: string;
  nombre: string;
  responsable_id: string;
  responsable: Responsable;
  fecha_creacion: string | Date;
  fecha_actualizacion: string | Date;
  fecha_inactivacion?: string | Date | null;

  constructor(attributes: Partial<Ubicacion> = {}) {
    this.id = attributes.id ?? "";
    this.nombre = attributes.nombre ?? "";
    this.responsable_id = attributes.responsable_id ?? "";
    this.responsable = attributes.responsable ?? ({} as Responsable); //TODO:MEJORAR
    this.fecha_creacion = attributes.fecha_creacion ?? "";
    this.fecha_actualizacion = attributes.fecha_actualizacion ?? "";
    this.fecha_inactivacion = attributes.fecha_inactivacion ?? "";
  }
}
