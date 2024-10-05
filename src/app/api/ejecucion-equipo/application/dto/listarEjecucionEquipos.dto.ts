
export interface ListarEjecucionDTO {
  codigo: string;
  responsable: string;
  observaciones: string;
  fechaEjecucion: string | Date;
  equipoDescripcion: string;
}
