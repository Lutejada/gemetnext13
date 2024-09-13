import { ObtenerDatosDto } from "../../../common/types";
import {
  DatosMetrologicosEquipos,
  Equipo,
  DatosComplementariosEquipo,
  ProgramacionEquipos,
} from "..";
import { CrearDatosComplementariosDto } from "../../application/dtos/crearDatosComplementarios.dto";
import { CrearDatosMetrologicosDto } from "../../application/dtos/crearDatosMetrologicos.dto";
import { CrearEquipoDto } from "../../application/dtos/crearEquipo.dto";
import { CrearProgramacionEquipoDto } from "../../application/dtos/crearProgramation.dto";
import { EditarDatosComplementariosDto } from "../../application/dtos/editarDatosComplementarios.dto";
import { EditarDatosMetrologicosDto } from "../../application/dtos/editarDatosMetrologicos.dto";
import {
  EquipoProgramacionDto,
  EquipoProgramacionVencerDto,
  ListaProgramacionEquiposDTO,
} from "../../application/dtos/listaProgramacionEquipos.output";
import { ObtenerEquiposDtoOutput } from "../../application/dtos/obtenerEquipos.dto.output";
import { listarEquiposProgramados } from "../../application/servicios/listarEquiposProgramados";

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
    dtoList: CrearProgramacionEquipoDto[],
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
  listarEquiposProgramadosPorVencer: (
    clienteId: string
  ) => Promise<ProgramacionEquipos[]>;
}

export interface EquipoReadRepository {
  listarEquiposProgramadosPorVencer(
    clienteId: string
  ): Promise<ProgramacionEquipos[]>;
}
