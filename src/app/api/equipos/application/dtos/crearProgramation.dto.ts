import { object, string } from "zod";

export interface CrearProgramacionEquipoDto {
  actividadId: string;
  codigo: string;
  frecuenciaId: string;
  equipoId: string;
  fechaProgramacion: string;
}

export const programacionEquipo = object({
  codigo: string({ description: "codigo requerido" }),
  actividadId: string({ description: "descripcion requerido" }),
  frecuenciaId: string({ description: "modelo requerido" }),
  equipoId: string({ description: "serie requerido" }),
  fechaProgramacion: string({ description: "marca_id requerido" }),
});
export const validarCrearProgramacion = (
  equipo: CrearProgramacionEquipoDto
) => {
  programacionEquipo.parse(equipo);
};
