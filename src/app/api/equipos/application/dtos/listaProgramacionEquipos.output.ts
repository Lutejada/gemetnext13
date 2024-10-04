import { EstadoProgramacion } from "@prisma/client";

export class ListaProgramacionEquiposDTO {
  equiposProgramados: EquipoProgramacionDto[];
  existeSiguientePagina: boolean;
}

export class EquipoProgramacionDto {
  id:string;
  codigo: string;
  descripcion: string;
  actividad: string;
  frecuencia: string;
  fechaProgramacion: string | Date;
  alertaEstado: Estatus;
  estado: EstadoProgramacion
}

export interface Estatus {
  descripcion: string;
  color: "success" | "warning" | "danger" | "expired";
}