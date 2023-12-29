import { object, string } from "zod";

export interface CrearProgramacionPatronDto {
  actividadId: string;
  codigo: string;
  frecuenciaId: string;
  patronId: string;
  fechaProgramacion: Date;
}

export const programacionPatron = object({
  codigo: string({ description: "codigo requerido" }),
  descripcion: string({ description: "descripcion requerido" }),
  modelo: string({ description: "modelo requerido" }),
  serie: string({ description: "serie requerido" }),
  marcaId: string({ description: "marca_id requerido" }),
  ubicacionId: string({ description: "ubicacionId requerido" }),
});
export const validarCrearProgramacion = (
  patron: CrearProgramacionPatronDto
) => {
  programacionPatron.parse(patron);
};
