export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  password:string;
  fecha_creacion: string | Date;
  fecha_actualizacion: string | Date;
  fecha_inactivacion?: string | Date | null;
}
