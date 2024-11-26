import { PaginationOptions, queryValuesDTO } from "../../../common/types";
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
import { ObtenerEquiposDtoOutput } from "../../application/dtos/obtenerEquipos.dto.output";
import { EstadoProgramacion } from "@prisma/client";
import { EquipoEntity } from "../entity";

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
  ) => Promise<void>;
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
  listarEquiposProgramadosPorVencer: (
    clienteId: string
  ) => Promise<ProgramacionEquipos[]>;
}

export interface EquipoReadRepository {
  listarEquiposProgramadosPorVencer(
    clienteId: string
  ): Promise<ProgramacionEquipos[]>;
  obtenerProgramacionPorId(
    id: string,
    clienteId: string
  ): Promise<ProgramacionEquipos | null>;
  obtenerPorID(ID: string, clienteID: string): Promise<Equipo | null>;
  listarEquipos(
    clienteId: string,
    page: number,
    limit: number
  ): Promise<EquipoEntity[]>;
  totalEquipos(clienteId: string): Promise<number>;
  totalEquiposPorTermino(
    clienteId: string,
    termino: string,
    valor: string
  ): Promise<number>;
  obtenerEquiposPorTermino(
    clienteId: string,
    termino: string,
    valor: string,
    paginationOptions: PaginationOptions
  ): Promise<EquipoEntity[]>;
}
export interface EquipoWriteRepository {
  cambiarProgramacionEstado(
    id: string,
    clienteId: string,
    estado: EstadoProgramacion
  ): Promise<void>;
}
