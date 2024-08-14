export class ListaProgramacionEquiposDTO {
  equiposProgramados: EquipoProgramacionDto[];
  existeSiguientePagina: boolean;
}

export class EquipoProgramacionDto {
  codigo: string;
  descripcion: string;
  actividad: string;
  frecuencia: string;
  fechaProgramacion: string | Date;
}

export interface Estatus {
  descripcion: string;
  color: "success" | "warning" | "danger" | "expired";
}

export class EquipoProgramacionVencerDto extends EquipoProgramacionDto {
  estado: Estatus;
}
