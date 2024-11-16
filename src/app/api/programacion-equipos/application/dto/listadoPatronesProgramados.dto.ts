import { EstadoProgramacion } from "@prisma/client";

export class EquipoProgramacionDto {
  id: string;
  codigo: string;
  descripcion: string;
  actividad: string;
  frecuencia: string;
  fechaProgramacion: string | Date;
  alertaEstado: Estatus;
  estado: EstadoProgramacion;
}

export class ResponseListadoEquiposProgramados {
  data: EquipoProgramacionDto[];
  pagina: number;
  existePaginaSiguiente: boolean;
  total: number;
}

export interface Estatus {
  descripcion: string;
  color: "success" | "warning" | "danger" | "expired";
}
