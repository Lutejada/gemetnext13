import { object, string } from "zod";

export interface CrearPatronDto {
  codigo: string;
  descripcion: string;
  modelo: string;
  serie: string;
  marcaId: string;
  ubicacionId: string;
  tipoPatronId: string;
}

export const validarCrearPatron = (value: CrearPatronDto) => {
  object({
    codigo: string({ description: "codigo requerido" }),
    descripcion: string({ description: "descripcion requerido" }),
    modelo: string({ description: "modelo requerido" }),
    serie: string({ description: "serie requerido" }),
    marcaId: string({ description: "marca_id requerido" }),
    ubicacionId: string({ description: "ubicacionId requerido" }),
    tipoPatronId: string({ description: "tipoPatronId requerido" }),
  }).parse(value);
};
