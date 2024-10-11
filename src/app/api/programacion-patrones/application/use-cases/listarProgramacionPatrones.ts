import { differenceInDays, startOfDay, format } from "date-fns";
import { ProgramacionPatrones } from "../../domain/entity";
import { ProgramacionPatronesRepositoryRead } from "../../domain/repository/indext";
import {
  Estatus,
  PatronProgramacionDto,
} from "../dto/listadoPatronesProgramados.dto";
export class ListarProgramacionPatrones {
  constructor(
    private programacionRepoRead: ProgramacionPatronesRepositoryRead
  ) {}
  async execute(clienteId: string) {
    const listado = await this.programacionRepoRead.listarProgramaciones(
      clienteId
    );
    return this.converToDTO(listado);
  }

  private converToDTO(
    programacion: ProgramacionPatrones[]
  ): PatronProgramacionDto[] {
    return programacion.map((p) => {
      const reminderStatus = this.calculateLabel(p.fechaProgramacion);
      return {
        actividad: p.actividad?.descripcion!,
        codigo: p.patron?.codigo!,
        descripcion: p.patron?.descripcion!,
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
