import { differenceInDays, format, startOfDay } from "date-fns";
import { ProgramacionEquipos } from "../../../dominio";
import { EquipoReadRepository } from "../../../dominio/repository/index";
import {
  EquipoProgramacionDto,
  Estatus,
} from "../../dtos/listaProgramacionEquipos.output";

export class ListarEquiposProgramados {
  constructor(private repository: EquipoReadRepository) {}

  async execute(clienteId: string): Promise<EquipoProgramacionDto[]> {
    const equipos = await this.repository.listarEquiposProgramadosPorVencer(
      clienteId
    );
    return this.converToDTO(equipos);
  }

  private converToDTO(
    programacion: ProgramacionEquipos[]
  ): EquipoProgramacionDto[] {
    return programacion.map((p) => {
      const estado = this.calculateLabel(p.fechaProgramacion);
      return {
        actividad: p.actividad?.descripcion!,
        codigo: p.equipo?.codigo!,
        descripcion: p.equipo?.descripcion!,
        fechaProgramacion: format(p.fechaProgramacion, "dd-MM-yyyy"),
        frecuencia: p.frecuencia?.descripcion!,
        estado: estado,
        id: p.id,
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
