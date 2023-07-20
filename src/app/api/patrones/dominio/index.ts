export interface Patron {
  id: string;
  codigo: string;
  descripcion: string;
  modelo: string;
  serie: string;
  marca_id: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_inactivacion: Date | null;
  ubicacionId?: string | null ;
  datos_metrologicos_patronesId?: string | null;
}
