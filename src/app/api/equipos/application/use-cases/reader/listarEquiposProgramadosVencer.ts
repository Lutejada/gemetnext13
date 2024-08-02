import { differenceInDays, format, startOfDay } from "date-fns";
import { ProgramacionEquipos } from "../../../dominio";
import { EquipoReadRepository } from "../../../dominio/repository/index";
import { EquipoProgramacionVencerDto } from "../../dtos/listaProgramacionEquipos.output";

export class ListarEquiposProgramadosVencer {
  constructor(private repository: EquipoReadRepository) {}

  async execute(clienteId: string) {
    const equipos = await this.repository.listarEquiposProgramadosPorVencer(
      clienteId
    );
    return this.converToDTO(equipos)
  }

  private converToDTO(
    programacion: ProgramacionEquipos[]
  ): EquipoProgramacionVencerDto[] {
    return programacion.map((p) => {
      const vencer = this.calculateLabel(p.fechaProgramacion);
      return {
        actividad: p.actividad?.descripcion!,
        codigo: p.equipo?.codigo!,
        descripcion: p.equipo?.descripcion!,
        fechaProgramacion: format(p.fechaProgramacion, "dd-MM-yyyy"),
        frecuencia: p.frecuencia?.descripcion!,
        vencer: vencer,
      };
    });
  }

  private calculateLabel(fechaProgramacion: string | Date) {
    const diasRestantes = differenceInDays(
      new Date(fechaProgramacion),
      startOfDay(new Date())
    );
    let vencer: "success" | "warning" | "danger";

    if (diasRestantes > 5) {
      vencer = "success";
    } else if (diasRestantes > 2) {
      vencer = "warning";
    } else {
      vencer = "danger";
    }

    return vencer;
  }
}
