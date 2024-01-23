import { ObtenerDatosDto } from "../../common/types";
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
import { EditarDatosComplementariosDto } from "../dtos/editarDatosComplementarios.dto";
import { EditarDatosMetrologicosDto } from "../dtos/editarDatosMetrologicos.dto";
import { ListaProgramacionEquiposDTO } from "../dtos/listaProgramacionEquipos.output";
import { ObtenerEquiposDtoOutput } from "../dtos/obtenerEquipos.dto.output";

export interface EquipoRepositorio {
  crearEquipo: (dto: CrearEquipoDto, clienteId: string) => Promise<void>;
  crearDatosMetrologicos: (
    dto: CrearDatosMetrologicosDto,
    equipoId: string,
    clienteId: string
  ) => Promise<DatosMetrologicosEquipos>;
  obtenerEquipoPorCodigo: (
    codigo: string,
    clienteId: string
  ) => Promise<Equipo | null>;
  obtenerEquipoPorId: (id: string, clienteId: string) => Promise<Equipo | null>;
  crearDatosComplementarios: (
    equipoId: string,
    dto: CrearDatosComplementariosDto,
    clienteId: string
  ) => Promise<DatosComplementariosEquipo>;
  crearProgramacionEquipo: (
    dto: CrearProgramacionEquipoDto,
    clienteId: string
  ) => Promise<ProgramacionEquipos>;
  obtenerEquipos: (
    clienteId: string,
    page: number
  ) => Promise<ObtenerEquiposDtoOutput>;
  obtenerEquiposPorCodigo: (codigo: string) => Promise<ObtenerEquiposDtoOutput>;
  obtenerEquiposPorMarca: (marca: string) => Promise<Equipo[]>;
  editarEquipo: (
    codigo: string,
    equipo: Partial<Equipo>,
    clienteId: string
  ) => Promise<void>;
  editarDatosMetrologicos: (
    equipoId: string,
    dto: EditarDatosMetrologicosDto,
    clienteId: string
  ) => Promise<void>;
  editarDatosComplementarios: (
    equipoId: string,
    dto: EditarDatosComplementariosDto,
    clienteId: string
  ) => Promise<void>;
  listarEquiposProgramados: (
    clienteId: string,
    dto?: ObtenerDatosDto
  ) => Promise<ListaProgramacionEquiposDTO>;
}
