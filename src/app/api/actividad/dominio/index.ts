export interface Actividad {
  id: string;
  descripcion: string;
  fecha_creacion: string | Date;
  fecha_actualizacion: string | Date;
  fecha_inactivacion?: string | Date | null;
  clienteId: string;
}
