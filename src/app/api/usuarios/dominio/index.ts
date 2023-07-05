export interface Usuario {
  id: string;
  usuario:string;
  nombre: string;
  apellido:string;
  cargo:string
  rol:string | Role;
  correo: string;
  password:string;
  fecha_creacion: string | Date;
  fecha_actualizacion: string | Date;
  fecha_inactivacion?: string | Date | null;
}
export enum Role {
  Admin="Admin",
  Metrologo="Metrologo",
  Auxiliar="Auxiliar",
  Consulta="Consulta",
  Cordinador="Cordinador",
}
