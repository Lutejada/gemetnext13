export interface Equipo {
  id: string;
  codigo: string;
  descripcion: string;
  modelo: string;
  serie: string;
  marca_id: string;
  ubicacion_id: string;
  fecha_creacion: Date | string;
  fecha_actualizacion: Date | string;
  fecha_inactivacion?: Date | string | null;
}
