import {
  DatosMetrologicosEquipos,
  Equipo,
  DatosComplementariosEquipo,
  ProgramacionEquipos,
} from "../dominio";
import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";
import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos.dto";
import { CrearEquipoDto } from "../dtos/crearEquipo.dto";
import { CrearProgramacionEquipoDto } from "../dtos/crearProgramation.dto";

export interface EquipoRepositorio {
  crearEquipo: (dto: CrearEquipoDto) => Promise<Equipo>;
  crearDatosMetrologicos: (
    dto: CrearDatosMetrologicosDto,
    equipoId: string
  ) => Promise<DatosMetrologicosEquipos>;
  obtenerEquiporPorCodigo: (codigo: string) => Promise<Equipo | null>;
  obtenerEquipoPorId: (id: string) => Promise<Equipo | null>;
  crearDatosComplementarios: (
    equipoId: string,
    dto: CrearDatosComplementariosDto
  ) => Promise<DatosComplementariosEquipo>;
  crearProgramacionEquipo:(dto:CrearProgramacionEquipoDto)=>Promise<ProgramacionEquipos>
  obtenerEquipos:()=>Promise<Equipo[]>
}
