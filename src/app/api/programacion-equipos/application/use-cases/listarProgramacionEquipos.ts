import { differenceInDays, startOfDay, format } from "date-fns";
import { ProgramacionEquipos } from "../../domain/entity";
import { ProgramacionEquiposRepositoryRead } from "../../domain/repository/indext";
import {
  Estatus,
  EquipoProgramacionDto,
  ResponseListadoPatronesProgramados,
} from "../dto/listadoPatronesProgramados.dto";
export class ListarProgramacionEquipos {
  constructor(
    private programacionRepoRead: ProgramacionEquiposRepositoryRead
  ) {}
  async execute(
    clienteId: string,
    pagina: number,
    limite: number
  ): Promise<ResponseListadoPatronesProgramados> {
    const listado = await this.programacionRepoRead.listarProgramaciones(
      clienteId,
      pagina,
      limite
    );

    const total = await this.programacionRepoRead.obtenerTotal(clienteId);
    const existePaginaSiguiente = (pagina + 1) * limite < total;

    const data = this.converToEquiposProgramacion(listado);
    return {
      data,
      pagina,
      existePaginaSiguiente: existePaginaSiguiente,
      total,
    };
  }

  private converToEquiposProgramacion(
    programacion: ProgramacionEquipos[]
  ): EquipoProgramacionDto[] {
    return programacion.map((p) => {
      const reminderStatus = this.calculateLabel(p.fechaProgramacion);
      return {
        actividad: p.actividad?.descripcion!,
        codigo: p.equipo?.codigo!,
        descripcion: p.equipo?.descripcion!,
        fechaProgramacion: format(new Date(p.fechaProgramacion), "dd-MM-yyyy"),
        frecuencia: p.frecuencia?.descripcion!,
        alertaEstado: reminderStatus,
        id: p.id,
        estado: p.estado ?? "PENDIENTE",
      };
    });
  }

  private calculateLabel(fechaProgramacion: string | Date): Estatus {
    const diasRestantes = differenceInDays(
      new Date(fechaProgramacion),
      startOfDay(new Date())
    );
    if (diasRestantes > 8) {
      return {
        color: "success",
        descripcion: `${diasRestantes} dias`,
      };
    } else if (diasRestantes > 5) {
      return {
        color: "warning",
        descripcion: `${diasRestantes} dias`,
      };
    } else if (diasRestantes > 3) {
      return {
        color: "warning",
        descripcion: `${diasRestantes} dias`,
      };
    } else if (diasRestantes >= 1) {
      return {
        color: "danger",
        descripcion: `${diasRestantes} dias`,
      };
    } else if (diasRestantes < 1) {
      return {
        color: "expired",
        descripcion: `vencido`,
      };
    }
    return {
      color: "success",
      descripcion: "",
    };
  }
}
