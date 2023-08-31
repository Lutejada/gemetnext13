import { DatosMetrologicosPatrones, Patron } from "../dominio/index";
import { CrearPatronDto } from "../dtos/crearPatrones";
import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos";
export interface PatronRepositorio {
  crearPatron: (dto: CrearPatronDto) => Promise<Patron>;
  obtenerPatronPorCodigo: (codigo: string) => Promise<Patron | null>;
  crearDatosMetrologicos: (
    dto: CrearDatosMetrologicosDto,
    patronId: string
  ) => Promise<DatosMetrologicosPatrones>;
}
