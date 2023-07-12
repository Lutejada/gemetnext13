import { object, string } from "zod";

export interface CrearPatronDto {
    codigo:string;
    descripcion:string;
    modelo:string;
    serie:string;
    responsable_id:string;
    marca_id:string;
    ubicacionId:string;
}



export const validarCrear = (value: CrearPatronDto) => {
  object({
    codigo: string(),
    descripcion: string(),
    modelo: string(),
    serie: string(),
    responsable_id: string(),
    marca_id: string(),
    ubicacionId: string(),
  }).parse(value);
};
