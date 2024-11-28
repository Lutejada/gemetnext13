export class Marca {
  id: string;
  identificacion: string;
  descripcion: string;
  fechaCreacion: string | Date;
  fechaactualizacion: string | Date;
  fecha_inactivacion?: string | Date | null;

  constructor(attributes: Partial<Marca> = {}) {
    this.id = attributes.id ?? "Desconocido";
    this.identificacion = attributes.identificacion ?? "Desconocido";
    this.descripcion = attributes.descripcion ?? "Desconocido";
    this.fechaCreacion = attributes.fechaCreacion ?? new Date();
    this.fechaactualizacion = attributes.fechaactualizacion ?? new Date();
    this.fecha_inactivacion = attributes.fecha_inactivacion ?? new Date();
  }
}
