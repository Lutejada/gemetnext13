import { validateFileSizeServer } from "@/app/api/common/files/filesSize";
import { object, string, z } from "zod";

export interface CrearEjecucionDTO {
  fechaEjecucion: string | Date;
  observaciones: string;
  ejecutorId: string;
  programacionPatronId: string;
  archivos?: File[];
}

export const schema = object({
  fechaEjecucion: string({ description: "fechaEjecucion" }),
  observaciones: string({ description: "observaciones" }),
  ejecutorId: string({ description: "ejecutorId" }),
  programacionPatronId: string({ description: "programacionEquipoId" }),
  archivos: z.any().refine(validateFileSizeServer, {
    message: "Los archivos no deben pensar mas de 4 MB",
  })
});
export const validarCrearEjecucionPatron = (ejecucion: CrearEjecucionDTO) => {
  schema.parse(ejecucion);
};
