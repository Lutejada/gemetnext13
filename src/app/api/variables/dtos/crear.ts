import { object, string } from "zod";
import { Variable } from "../dominio";

export interface CrearVariableDto {
  alias: string;
  descripcion: string;
  magnitud_id:string
}

export const validarCrearVariable = (variable: CrearVariableDto) => {
  object({  
    alias: string({ description: "Alias es requerido" }),
    descripcion: string({ description: "descripcion es requerido" }),
    magnitud_id: string({ description: "maginutud_id es requerido" }),
  }).parse(variable);
};
