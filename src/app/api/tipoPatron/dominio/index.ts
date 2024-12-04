export class TipoPatron {
  id: string;
  alias: string;
  descripcion: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_inactivacion?: Date | null;

  constructor(attributes: Partial<TipoPatron> = {}) {
    this.id = attributes.id ?? "";
    this.alias = attributes.alias ?? "";
    this.descripcion = attributes.descripcion ?? "";
    this.fecha_creacion = attributes.fecha_creacion ?? new Date();
    this.fecha_actualizacion = attributes.fecha_actualizacion ?? new Date();
    this.fecha_inactivacion = attributes.fecha_inactivacion ?? new Date();
  }
}
