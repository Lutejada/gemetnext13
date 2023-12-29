export interface ListaProgramacionPatronesDTO {
  patronesProgramados:PatronProgramacionDto[]
  existeSiguientePagina: boolean;
}

export interface PatronProgramacionDto {
  codigo: string;
  descripcion: string;
  actividad: string;
  frecuencia: string;
  fechaProgramacion: string | Date;
}
