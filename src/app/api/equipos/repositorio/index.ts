import { Equipo } from "../dominio";
import { CrearEquipoDto } from "../dtos/crear";

export interface EquipoRepositorio {
  crearEquipo: (dto: CrearEquipoDto) => Promise<Equipo>;
}
