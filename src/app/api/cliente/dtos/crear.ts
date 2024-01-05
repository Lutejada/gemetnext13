import { object, string } from "zod";

export interface CrearDto {
  identificacion: string;
  nombre: string;
  apellido:string
}

export const validarCrear = (value: CrearDto) => {
  object({
    nombre: string({ description: "nombre es requerido" }),
    identificacion: string({ description: "identificacion es requerido" }),
    apellido: string({ description: "apellido es requerido" }),
  }).parse(value);
};
