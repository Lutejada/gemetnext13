import { crearUbicacionDto } from "@/app/api/ubicaciones/dtos/crearUbicacion.dto";
import { object, string } from "zod";

export interface CrearEjecucionDTO {
  fechaEjecucion: string | Date;
  observaciones: string;
  ejecutorId: string;
  programacionEquipoId: string;
}

export const schema = object({
  fechaEjecucion: string({ description: "fechaEjecucion" }),
  observaciones: string({ description: "observaciones" }),
  ejecutorId: string({ description: "ejecutorId" }),
  programacionEquipoId: string({ description: "programacionEquipoId" }),
});
export const validarCrearEjecucionEquipo = (ejecucion: CrearEjecucionDTO) => {
  schema.parse(ejecucion);
};
