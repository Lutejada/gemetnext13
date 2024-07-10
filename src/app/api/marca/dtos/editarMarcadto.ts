import { object, string } from "zod";

export interface EditarMarcaDto {
  identificacion?: string;
  descripcion?: string;
}

export const validarEditarMarca = (marca: EditarMarcaDto) => {
  object({
    identificacion: string({ description: "identificacion es requerido" }).optional(),
    descripcion: string({ description: "descripcion es requerido" }).optional(),
  }).parse(marca);
};
