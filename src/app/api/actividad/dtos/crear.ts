import { object, string } from "zod";

export interface CrearActividadDto {
  descripcion: string;
}

export const validarCrearActividad = (actividad: CrearActividadDto) => {
  object({
    descripcion: string({ description: "descripcion es requerido" }),
  }).parse(actividad);
};
