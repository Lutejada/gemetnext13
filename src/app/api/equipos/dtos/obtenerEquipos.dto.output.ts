export interface ObtenerEquiposDtoOutput {
  equipos: {
    codigo: string;
    id: string;
    descripcion: string;
    marca: string;
    responsable: string;
  }[];
  existeSiguientePagina: boolean;
}
