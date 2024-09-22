import { crearUbicacionDto } from "@/app/api/ubicaciones/dtos/crearUbicacion.dto";
import { object, string } from "zod";

export interface CrearEjecucionDTO {
  fechaEjecucion: string;
  observaciones: string;
  ejecutorId: string;
}

export const schema = object({
  fechaEjecucion: string({ description: "fechaEjecucion" }),
  observaciones: string({ description: "observaciones" }),
  ejecutorId: string({ description: "ejecutorId" }),
});
export const validarCrearEjecucionEquipo = (ejecucion: CrearEjecucionDTO) => {
  schema.parse(ejecucion);
};
