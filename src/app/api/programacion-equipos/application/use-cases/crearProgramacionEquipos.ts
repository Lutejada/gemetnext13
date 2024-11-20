import { ActividadRepositoryRead } from "@/app/api/actividad/dominio/repository";
import { ProgramacionEquipos } from "../../domain/entity";
import {
  ProgramacionEquiposRepositoryRead,
  ProgramacionEquiposRepositoryWrite,
} from "../../domain/repository/indext";
import { CrearProgramacionEquipoDto } from "../dto/crearProgramation.dto";
import { ActividadNoExiste } from "@/app/api/actividad/dominio/errors";
import { addDays, getYear } from "date-fns";
import { PatronNoExiste } from "../../../patrones/dominio/errors";
import { FrecuenciaRepositoryRead } from "@/app/api/frecuencia/dominio/repository";
import { FrecuenciaNoExiste } from "@/app/api/frecuencia/dominio/errors";
import { ProgramacionYaExiste } from "../../domain/errors";
import { EquipoReadRepository } from "../../../equipos/dominio/repository/index";
import { EquipoNoExiste } from "@/app/api/equipos/dominio/errors";
export class CrearProgramacionEquipos {
  constructor(
    private programacionRepoWrite: ProgramacionEquiposRepositoryWrite,
    private actividadRepo: ActividadRepositoryRead,
    private equipoRepo: EquipoReadRepository,
    private frecuenciaRepo: FrecuenciaRepositoryRead,
    private programacionRepoRead: ProgramacionEquiposRepositoryRead
  ) {}
  async execute(clienteId: string, dto: CrearProgramacionEquipoDto) {
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

    const equipo = await this.equipoRepo.obtenerPorID(dto.equipoId, clienteId);
    if (!equipo) {
      throw new EquipoNoExiste();
    }

    const progracionesEncontradas =
      await this.programacionRepoRead.listaProgramacionesPorFrecuenciaYActividad(
        clienteId,
        actividad.id,
        frecuencia.id,
        equipo.id
      );
    if (progracionesEncontradas.length > 0) {
      throw new ProgramacionYaExiste();
    }

    const programacionInicial = new ProgramacionEquipos({
      id: "",
      actividad: actividad,
      fechaActualizacion: new Date(),
      fechaCreacion: new Date(),
      fechaProgramacion: dto.fechaProgramacion,
      frecuencia: frecuencia,
      equipo: equipo,
    });
    const programaciones =
      this.crearProgramacionPorFrecuencia(programacionInicial);
    await this.programacionRepoWrite.crearProgramaciones(
      clienteId,
      programaciones
    );
  }

  crearProgramacionPorFrecuencia = (
    programacionInicial: ProgramacionEquipos
  ): ProgramacionEquipos[] => {
    const dtoList: ProgramacionEquipos[] = [programacionInicial];
    const cantidadDias = programacionInicial?.frecuencia?.cantidad_dias ?? 30;
    const initialDate = new Date(programacionInicial.fechaProgramacion);
    const currentYear = getYear(initialDate);
    let yearOfTheNextDate = getYear(addDays(initialDate, cantidadDias));
    let auxDate = initialDate;
    while (currentYear >= yearOfTheNextDate) {
      const nextDate = addDays(auxDate, cantidadDias);
      auxDate = nextDate;
      dtoList.push({
        actividad: programacionInicial.actividad,
        fechaActualizacion: programacionInicial.fechaActualizacion,
        fechaCreacion: programacionInicial.fechaCreacion,
        frecuencia: programacionInicial.frecuencia,
        equipo: programacionInicial.equipo,
        id: programacionInicial.id,
        fechaProgramacion: nextDate.toISOString(),
      });
      yearOfTheNextDate = getYear(addDays(nextDate, cantidadDias));
    }
    return dtoList;
  };
}
