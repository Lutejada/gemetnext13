export interface Magnitud {
  id: string;
  alias: string;
  descripcion: string;
  fecha_creacion: Date | string;
  fecha_actualizacion: Date | string;
  fecha_inactivacion?: Date | string | null;
}
