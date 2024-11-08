import { object, string } from "zod";

export interface CrearProgramacionEquipoDto {
  actividadId: string;
  codigo: string;
  frecuenciaId: string;
  equipoId: string;
  fechaProgramacion: Date | string;
}

export const programacionEquipo = object({
  codigo: string({ description: "codigo requerido" }),
  actividadId: string({ description: "codigo requerido" }),
  frecuenciaId: string({ description: "codigo requerido" }),
  fechaProgramacion: string({ description: "codigo requerido" }),
});
export const validarCrearProgramacion = (
  patron: CrearProgramacionEquipoDto
) => {
  programacionEquipo.parse(patron);
};
