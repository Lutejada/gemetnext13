export interface Responsable {
  id: string;
  identificacion: string;
  apellido: string;
  nombre: string;
  fecha_creacion: string | Date;
  fecha_actualizacion: string | Date;
  fecha_inactivacion?: Date | string | null;
}
