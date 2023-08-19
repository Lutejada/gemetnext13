import { DatosMetrologicosEquipos, Equipo } from "../dominio";
import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos.dto";
import { CrearEquipoDto } from "../dtos/crearEquipo.dto";

export interface EquipoRepositorio {
  crearEquipo: (dto: CrearEquipoDto) => Promise<Equipo>;
  crearDatosMetrologicos: (
    dto: CrearDatosMetrologicosDto,
    equipoId: string
  ) => Promise<DatosMetrologicosEquipos>;
  obtenerEquiporPorCodigo: (codigo: string) => Promise<Equipo | null>;
  obtenerEquipoPorId: (id: string) => Promise<Equipo | null>;

}
