import { number, object, string } from "zod";

export interface CrearDatosMetrologicosDto {
  codigo: string;
  emp: number;
  divisionEscala: number;
  resolucion: number;
  rangoMinimo: number;
  rangoMaximo: number;
  valorNominal: number;
}

export const validarCrearDatosMetrologicos = (
  value: CrearDatosMetrologicosDto
) => {
  object({
    codigo: string({ description: "codigo requerido" }),
    emp: number({ description: "emp requerido" }),
    divisionEscala: number({ description: "divisionEscala requerido" }),
    resolucion: number({ description: "resolucion requerido" }),
    rangoMinimo: number({ description: "rangoMinimo requerido" }),
    rangoMaximo: number({ description: "rangoMaximo requerido" }),
    valorNominal: number({ description: "valorNominal requerido" }),
  }).parse(value);
};
