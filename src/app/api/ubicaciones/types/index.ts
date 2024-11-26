import { Responsable } from "../../responsables/domain/entity";

export class Ubicacion {
  id: string;
  nombre: string;
  responsable_id: string;
  responsable: Responsable;
  fecha_creacion: string | Date;
  fecha_actualizacion: string | Date;
  fecha_inactivacion?: string | Date | null;
}
