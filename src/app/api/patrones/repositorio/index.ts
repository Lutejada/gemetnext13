import {
  DatosComplementariosPatrones,
  DatosMetrologicosPatrones,
  Patron,
  ProgramacionPatrones,
} from "../dominio";
import { CrearPatronDto } from "../dtos/crearPatrones";
import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos";
import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";
import { ObtenerPatronesDtoOutput } from "../dtos/obtenerPatrones.dto.output";
import { queryValuesDTO } from "../../common/types";
import { EditarDatosMetrologicosDto } from "../dtos/editarDatosMetrologicos.dto";
import { EditarDatosComplementariosDto } from "../dtos/editarDatosComplementarios.dto";
import { CrearProgramacionPatronDto } from "../dtos/crearProgramation.dto";
import { ListaProgramacionPatronesDTO } from "../dtos/listaProgramacionPatrones.output";
export interface PatronRepositorio {
  crearPatron: (dto: CrearPatronDto, clienteId: string) => Promise<Patron>;
  obtenerPatronPorCodigo: (
    codigo: string,
    clienteId: string
  ) => Promise<Patron | null>;
  crearDatosMetrologicos: (
    dto: CrearDatosMetrologicosDto,
    patronId: string,
    clienteId: string
  ) => Promise<DatosMetrologicosPatrones>;
  crearDatosComplementarios: (
    patronId: string,
    dto: CrearDatosComplementariosDto,
    clienteId: string
  ) => Promise<DatosComplementariosPatrones>;
  obtenerPatrones: (
    clienteId: string,
    dto?: queryValuesDTO
  ) => Promise<ObtenerPatronesDtoOutput>;
  editarDatosBasicos: (
    codigo: string,
    patron: Partial<Patron>,
    clienteId: string
  ) => Promise<void>;
  editarDatosMetrologicos: (
    equipoId: string,
    dto: EditarDatosMetrologicosDto,
    clienteId: string
  ) => Promise<void>;
  editarDatosComplementarios: (
    patronId: string,
    dto: EditarDatosComplementariosDto,
    clienteId: string
  ) => Promise<void>;
  crearProgramacionPatron: (
    dto: CrearProgramacionPatronDto,
    clienteId: string
  ) => Promise<ProgramacionPatrones>;
  listarPatronesProgramados: (
    clienteId: string,
    dto?: queryValuesDTO
  ) => Promise<ListaProgramacionPatronesDTO>;
}
