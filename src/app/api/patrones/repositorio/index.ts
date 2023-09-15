import {
  DatosComplementariosPatrones,
  DatosMetrologicosPatrones,
  Patron,
} from "../dominio";
import { CrearPatronDto } from "../dtos/crearPatrones";
import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos";
import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";
export interface PatronRepositorio {
  crearPatron: (dto: CrearPatronDto) => Promise<Patron>;
  obtenerPatronPorCodigo: (codigo: string) => Promise<Patron | null>;
  crearDatosMetrologicos: (
    dto: CrearDatosMetrologicosDto,
    patronId: string
  ) => Promise<DatosMetrologicosPatrones>;
  crearDatosComplementarios: (
    patronId: string,
    dto: CrearDatosComplementariosDto
  ) => Promise<DatosComplementariosPatrones>;
}
