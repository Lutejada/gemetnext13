export interface Marca {
  id: string;
  identificacion: string;
  descripcion: string;
  fechaCreacion: string | Date;
  fechaactualizacion: string | Date;
  fecha_inactivacion?: string | Date | null;
  cliente_id: string;
}
