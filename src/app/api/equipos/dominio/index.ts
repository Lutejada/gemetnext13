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
  datos_metrologicos?: DatosMetrologicosEquipos | null;
}

export interface DatosMetrologicosEquipos {
  id: string;
  equipo_id: string;
  emp: number;
  division_escala: number;
  resolucion: number;
  rango_minimo: number;
  rango_maximo: number;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_inactivacion?: Date | null;
}
