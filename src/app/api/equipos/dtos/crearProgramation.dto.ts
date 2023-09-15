import { object, string } from "zod";

export interface CrearProgramacionEquipoDto {
  actividadId: string;
  codigo: string;
  frecuenciaId: string;
  equipoId: string;
  fechaProgramacion: Date;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  fechaInactivacion?: Date | null;
}

export const programacionEquipo = object({
  codigo: string({ description: "codigo requerido" }),
  descripcion: string({ description: "descripcion requerido" }),
  modelo: string({ description: "modelo requerido" }),
  serie: string({ description: "serie requerido" }),
  marcaId: string({ description: "marca_id requerido" }),
  ubicacionId: string({ description: "ubicacionId requerido" }),
});
export const validarCrearProgramacion = (
  equipo: CrearProgramacionEquipoDto
) => {
  programacionEquipo.parse(equipo);
};
