import { object, string } from "zod";

export interface CrearTipoPatronDto {
  alias: string;
  descripcion: string;
}

export const validarCrearTipoPatron = (value: CrearTipoPatronDto) => {
  object({
    alias: string({ description: "nombre es requerido" }),
    descripcion: string({ description: "identificacion es requerido" }),
  }).parse(value);
};
