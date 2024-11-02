import { validateFileSizeServer } from "@/app/api/common/files/filesSize";
import * as z from "zod";

export interface CrearEjecucionDTO {
  fechaEjecucion: string | Date;
  observaciones: string;
  ejecutorId: string;
  programacionEquipoId: string;
  archivos?: File[];
}

export const schema = z.object({
  fechaEjecucion: z.string({ description: "fechaEjecucion" }),
  observaciones: z.string({ description: "observaciones" }),
  ejecutorId: z.string({ description: "ejecutorId" }),
  programacionEquipoId: z.string({ description: "programacionEquipoId" }),
  archivos: z.any().refine(validateFileSizeServer, {
    message: "Los archivos no deben pensar mas de 4 MB",
  }),
});
export const validarCrearEjecucionEquipo = (ejecucion: CrearEjecucionDTO) => {
  schema.parse(ejecucion);
};
