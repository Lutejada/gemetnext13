import { object, string } from "zod";

export interface EditarMarcaDto {
  id: string;
  identificacion?: string;
  descripcion?: string;
}

export const validarEditarMarca = (marca: EditarMarcaDto) => {
  object({
    id: string({description:'id es requerido'}),
    identificacion: string({
      description: "identificacion es requerido",
    }).optional(),
    descripcion: string({ description: "descripcion es requerido" }).optional(),
  }).parse(marca);
};
