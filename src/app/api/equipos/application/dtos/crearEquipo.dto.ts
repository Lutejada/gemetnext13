import { validateFileListSize } from "@/app/api/common/files/filesSize";
import { transformFileToFiles } from "@/app/api/common/files/transformFiles";
import { any, object, string } from "zod";

export class CrearEquipoDto {
  codigo: string;
  descripcion: string;
  modelo: string;
  serie: string;
  marcaId: string;
  ubicacionId: string;
  archivos?: File[];
}

export const equipoSchema = object({
  codigo: string({ description: "codigo requerido" }),
  descripcion: string({ description: "descripcion requerido" }),
  modelo: string({ description: "modelo requerido" }),
  serie: string({ description: "serie requerido" }),
  marcaId: string({ description: "marca_id requerido" }),
  ubicacionId: string({ description: "ubicacionId requerido" }),
  archivos: any()
    .refine(validateFileListSize, {
      message: "Los archivos no deben pensar mas de 4 MB",
    })
    .transform(transformFileToFiles)
    .optional(),
});
export const validarCrearEquipo = (equipo: CrearEquipoDto) => {
  return equipoSchema.parse(equipo);
};
