export interface ObtenerEquiposDtoOutput {
  equipos: EquipoInformacionBasicaDTO[];
  existeSiguientePagina: boolean;
}

export interface EquipoInformacionBasicaDTO {
  codigo: string;
  id: string;
  descripcion: string;
  marca: string;
  responsable: string;
}
