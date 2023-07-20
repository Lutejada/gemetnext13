import { Patron } from "../dominio/index";
import { CrearPatronDto } from "../dtos/crear";
export interface PatronRepositorio {
  crearPatron: (dto:CrearPatronDto) => Promise<Patron>;
  obtenerPatronPorCodigo:(codigo:string)=>Promise<Patron | null>
}