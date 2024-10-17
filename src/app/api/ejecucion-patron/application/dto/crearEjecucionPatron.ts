import { object, string } from "zod";

export interface CrearEjecucionDTO {
  fechaEjecucion: string | Date;
  observaciones: string;
  ejecutorId: string;
  programacionPatronId: string;
}

export const schema = object({
  fechaEjecucion: string({ description: "fechaEjecucion" }),
  observaciones: string({ description: "observaciones" }),
  ejecutorId: string({ description: "ejecutorId" }),
  programacionPatronId: string({ description: "programacionEquipoId" }),
});
export const validarCrearEjecucionPatron = (ejecucion: CrearEjecucionDTO) => {
  schema.parse(ejecucion);
};
