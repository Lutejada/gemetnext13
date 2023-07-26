import { number, object, string } from "zod";

export interface CrearDatosMetrologicosDto {
  codigo:string;
  emp: number
  divisionEscala: number
  resolucion: number
  rangoMinimo: number
  rangoMaximo: number
}

export const equipoSchema = object({
   codigo: string({description:'equipo_id requerido'}),
   emp: number({description:'emp requerido'}),
   divisionEscala: number({description:'division_escala requerido'}),
   resolucion: number({description:'resolucion requerido'}),
   rangoMinimo: number({description:'rango_minimo requerido'}),
   rangoMaximo: number({description:'rango_maximo requerido'}),
 })
export const validarCrearEquipo = (equipo: CrearDatosMetrologicosDto) => {
  equipoSchema.parse(equipo)
};
