export interface ObtenerEquiposDtoOutput {
  equipos: EquipoInformacionBasicaDTO[];
  existeSiguientePagina: boolean;
}

export class EquipoInformacionBasicaDTO {
  codigo: string;
  id: string;
  descripcion: string;
  marca: string;
  responsable: string;
}
