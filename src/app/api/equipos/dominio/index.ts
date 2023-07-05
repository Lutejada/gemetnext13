export interface Equipo {
  id: string;
  codigo: string;
  descripcion: string;
  modelo: string;
  serie: string;
  responsable_id: string;
  marca_id: string;
  ubicacionId: string;
  fecha_creacion: Date | string;
  fecha_actualizacion: Date | string;
  fecha_inactivacion?: Date | string | null;
}
