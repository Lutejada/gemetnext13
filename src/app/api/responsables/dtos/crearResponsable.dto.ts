import { object, string } from "zod";

export interface crearResponsableDto {
  identificacion: string;
  nombre: string;
  apellido:string
}

export const validarCrearResponsable = (responsable: crearResponsableDto) => {
  object({
    nombre: string({ description: "nombre es requerido" }),
    identificacion: string({ description: "identificacion es requerido" }),
    apellido: string({ description: "apellido es requerido" }),
  }).parse(responsable);
};
