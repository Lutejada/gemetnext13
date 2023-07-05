import { number, object, string } from "zod";

export interface CrearFrecuenciaDto {
  descripcion: string;
  cantidadDias: number;
}

export const validarCrearFrecuencia = (frecuencia: CrearFrecuenciaDto) => {
  object({
    descripcion: string({ description: "identificacion es requerido" }),
    cantidadDias: number({ description: "cantidad dias es requerido" }).positive(),
  }).parse(frecuencia);
};
