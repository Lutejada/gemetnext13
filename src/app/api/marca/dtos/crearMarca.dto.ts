import { object, string } from "zod";

export interface CrearMarcaDto {
  identificacion:string
  descripcion:string
}

export const validarCrearMarca = (marca: CrearMarcaDto) => {
  object({
    identificacion: string({ description: "identificacion es requerido" }),
    descripcion: string({ description: "descripcion es requerido" }),
  }).parse(marca);
};
