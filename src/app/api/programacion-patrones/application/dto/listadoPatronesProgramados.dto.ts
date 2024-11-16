import { EstadoProgramacion } from "@prisma/client";

export class PatronProgramacionDto {
    id:string;
    codigo: string;
    descripcion: string;
    actividad: string;
    frecuencia: string;
    fechaProgramacion: string | Date;
    alertaEstado: Estatus;
    estado: EstadoProgramacion
  }

  export class ResponseListadoPatronesProgramados {
    data: PatronProgramacionDto[];
    pagina: number;
    existePaginaSiguiente: boolean;
    total: number;
  }
  
  export interface Estatus {
    descripcion: string;
    color: "success" | "warning" | "danger" | "expired";
  }