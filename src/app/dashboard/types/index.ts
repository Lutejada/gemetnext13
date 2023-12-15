export interface Responsable {
  id: string;
  identificacion: string;
  nombre: string;
  fecha_creacion: Date | string;
  fecha_actualizacion: Date | string;
}


export interface ObtenerEquiposDto {
  termino?: string;
  valor?: string;
  page?: number;
}
