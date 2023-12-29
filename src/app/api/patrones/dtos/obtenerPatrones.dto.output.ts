export interface ObtenerPatronesDtoOutput {
  patrones: PatronesResponse[];
  existeSiguientePagina: boolean;
}

export interface PatronesResponse {
  codigo: string;
  id: string;
  descripcion: string;
  marca: string;
  responsable: string;
}
