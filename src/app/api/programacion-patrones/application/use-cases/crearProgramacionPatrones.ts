import { ActividadRepositoryRead } from "@/app/api/actividad/dominio/repository";
import { ProgramacionPatrones } from "../../domain/entity";
import {
  ProgramacionPatronesRepositoryRead,
  ProgramacionPatronesRepositoryWrite,
} from "../../domain/repository";
import { CrearProgramacionPatronDto } from "../dto/crearProgramation.dto";
import { ActividadNoExiste } from "@/app/api/actividad/dominio/errors";
import { addDays, getYear } from "date-fns";
import { PatronRepositoryRead } from "../../../patrones/dominio/repository/index";
import { PatronNoExiste } from "../../../patrones/dominio/errors";
import { FrecuenciaRepositoryRead } from "@/app/api/frecuencia/dominio/repository";
import { FrecuenciaNoExiste } from "@/app/api/frecuencia/dominio/errors";
import { ProgramacionYaExiste } from "../../domain/errors";
export class CrearProgramacionPatrones {
  constructor(
    private programacionRepoWrite: ProgramacionPatronesRepositoryWrite,
    private actividadRepo: ActividadRepositoryRead,
    private patronRepo: PatronRepositoryRead,
    private frecuenciaRepo: FrecuenciaRepositoryRead,
    private programacionRepoRead: ProgramacionPatronesRepositoryRead
  ) {}
  async execute(clienteId: string, dto: CrearProgramacionPatronDto) {
    const actividad = await this.actividadRepo.obtenerPorId(
      dto.actividadId,
      clienteId
    );

    if (!actividad) {
      throw new ActividadNoExiste();
    }
    const frecuencia = await this.frecuenciaRepo.obtenerFrecuenciaPorId(
      dto.frecuenciaId,
      clienteId
    );

    if (!frecuencia) {
      throw new FrecuenciaNoExiste();
    }

    const patron = await this.patronRepo.obtenerPorID(dto.patronId, clienteId);
    if (!patron) {
      throw new PatronNoExiste();
    }

    const progracionesEncontradas =
      await this.programacionRepoRead.listaProgramacionesPorFrecuenciaYActividad(
        clienteId,
        actividad.id,
        frecuencia.id,
        patron.id
      );
    if (progracionesEncontradas.length > 0) {
      throw new ProgramacionYaExiste();
    }

    const programacionInicial = new ProgramacionPatrones({
      actividad: actividad,
      cliente: { id: clienteId, nombre: clienteId },
      fechaActualizacion: new Date(),
      fechaCreacion: new Date(),
      fechaProgramacion: dto.fechaProgramacion,
      frecuencia: frecuencia,
      id: "",
      patron: patron,
    });
    const programaciones =
      this.crearProgramacionPorFrecuencia(programacionInicial);
    await this.programacionRepoWrite.crearProgramaciones(
      clienteId,
      programaciones
    );
  }

  crearProgramacionPorFrecuencia = (
    programacionInicial: ProgramacionPatrones
  ): ProgramacionPatrones[] => {
    const dtoList: ProgramacionPatrones[] = [programacionInicial];
    const cantidadDias = programacionInicial.frecuencia.cantidad_dias;
    const initialDate = new Date(programacionInicial.fechaProgramacion);
    const currentYear = getYear(initialDate);
    let yearOfTheNextDate = getYear(addDays(initialDate, cantidadDias));
    let auxDate = initialDate;
    while (currentYear >= yearOfTheNextDate) {
      const nextDate = addDays(auxDate, cantidadDias);
      auxDate = nextDate;
      dtoList.push({
        cliente: programacionInicial.cliente,
        actividad: programacionInicial.actividad,
        fechaActualizacion: programacionInicial.fechaActualizacion,
        fechaCreacion: programacionInicial.fechaCreacion,
        frecuencia: programacionInicial.frecuencia,
        patron: programacionInicial.patron,
        id: programacionInicial.id,
        fechaProgramacion: nextDate.toISOString(),
      });
      yearOfTheNextDate = getYear(addDays(nextDate, cantidadDias));
    }
    return dtoList;
  };
}
