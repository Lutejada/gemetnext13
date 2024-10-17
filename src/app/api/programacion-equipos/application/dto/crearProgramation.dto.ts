import { object, string } from "zod";

export interface CrearProgramacionPatronDto {
  actividadId: string;
  codigo: string;
  frecuenciaId: string;
  patronId: string;
  fechaProgramacion: Date | string;
}

export const programacionPatron = object({
  codigo: string({ description: "codigo requerido" }),
  actividadId: string({ description: "codigo requerido" }),
  frecuenciaId: string({ description: "codigo requerido" }),
  fechaProgramacion: string({ description: "codigo requerido" }),
});
export const validarCrearProgramacion = (
  patron: CrearProgramacionPatronDto
) => {
  programacionPatron.parse(patron);
};
