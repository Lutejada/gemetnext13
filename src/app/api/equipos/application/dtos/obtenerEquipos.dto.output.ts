import { EquipoEntity } from "../../dominio/entity/index";
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

  static converToDTO(equipos: EquipoEntity[]): EquipoInformacionBasicaDTO[] {
    return equipos.map((e) => ({
      id: e.id,
      codigo: e.codigo,
      descripcion: e.descripcion,
      marca: e.marca.descripcion,
      responsable:
        e.ubicacion.responsable.nombre + " " + e.ubicacion.responsable.apellido,
    }));
  }
}
