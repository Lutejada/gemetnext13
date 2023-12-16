export interface ListaProgramacionEquiposDTO {
  equiposProgramados:EquipoProgramacionDto[]
  existeSiguientePagina: boolean;
}

export interface EquipoProgramacionDto {
  codigo: string;
  descripcion: string;
  actividad: string;
  frecuencia: string;
  fechaProgramacion: string | Date;
}
