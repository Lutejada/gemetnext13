import { number, object, string , nativeEnum } from "zod";
import { cumple } from "../dominio";

export interface CrearDatosComplementariosDto {
  descripcionEspecificaciones?: string | null;
  codigo:string;
  cumpleEspecificacionInstalaciones?: cumple;
  utilizaSoftware: cumple;
  descripcionSoftware?: string | null;
  versionSoftware?: string | null;
  fireware?: string | null;
  observaciones?: string | null;
}

export const equipoSchema = object({
  codigo: string({description:'codigo del equipo requerido'}),
  descripcionEspecificaciones: string({
    description: "descripcionEspecificaciones requerido",
  }).optional(),
  cumpleEspecificacionInstalaciones: nativeEnum(cumple),
  utilizaSoftware: nativeEnum(cumple),
  descripcionSoftware: string({ description: "descripcionSoftware requerido" }).optional(),
  versionSoftware: string({ description: "versionSoftware requerido" }).optional(),
  fireware: string({ description: "fireware requerido" }).optional(),
  observaciones: string({ description: "observaciones requerido" }).optional(),
});

export const validarCrearComplementarios = (
  complementarios: CrearDatosComplementariosDto
) => {
  equipoSchema.parse(complementarios);
};
