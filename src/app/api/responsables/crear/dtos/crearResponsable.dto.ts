import { object, string } from "zod";

export interface crearResponsableDto {
  alias: string;
  nombre: string;
}

export const validarCrearResponsable = (responsable: crearResponsableDto) => {
  object({
    nombre: string({ description: "nombre es requerido" }),
    alias: string({ description: "alias es requerido" }),
  }).parse(responsable);
};
