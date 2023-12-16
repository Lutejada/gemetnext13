export interface ObtenerEquiposDtoOutput {
  equipos: EquiposResponse[];
  existeSiguientePagina: boolean;
}

export interface EquiposResponse {
  codigo: string;
  id: string;
  descripcion: string;
  marca: string;
  responsable: string;
}
