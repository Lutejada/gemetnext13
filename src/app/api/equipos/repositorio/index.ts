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
import { ProgramarEquipoDto } from "../dtos/programarEquipoDto";

export interface EquipoRepositorio {
  crearEquipo: (dto: CrearEquipoDto) => Promise<Equipo>;
  crearDatosMetrologicos: (
    dto: CrearDatosMetrologicosDto,
    equipoId: string
  ) => Promise<DatosMetrologicosEquipos>;
  obtenerEquipoPorCodigo: (codigo: string) => Promise<Equipo | null>;
  obtenerEquipoPorId: (id: string) => Promise<Equipo | null>;
  crearDatosComplementarios: (
    equipoId: string,
    dto: CrearDatosComplementariosDto
  ) => Promise<DatosComplementariosEquipo>;
  crearProgramacionEquipo: (
    dto: CrearProgramacionEquipoDto
  ) => Promise<ProgramacionEquipos>;
  obtenerEquipos: (limit?: number) => Promise<ObtenerEquiposDtoOutput[]>;
  obtenerEquiposPorCodigo: (
    codigo: string
  ) => Promise<ObtenerEquiposDtoOutput[]>;
  obtenerEquiposPorMarca: (marca: string) => Promise<Equipo[]>;
