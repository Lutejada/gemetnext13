import { EquipoExiste } from "../errors";
import { EquipoReadRepository } from "../repository";

export class EquipoService {
  constructor(private equipoReadRepository: EquipoReadRepository) {}

  async obtenerEquipoPorCodigo(clienteId: string, equipoId: string) {
    const equipo = await this.equipoReadRepository.obtenerPorID(
      clienteId,
      equipoId
    );
    if (equipo) {
      throw new EquipoExiste();
    }
    return equipo;
  }

  //   async inactivarEquipo(clienteId: string, equipoId: string): Promise<void> {
  //     const equipo = await this.equipoReadRepository.obtenerPorID(
  //       clienteId,
  //       equipoId
  //     );
  //     if (!equipo) {
  //       throw new Error("Equipo no encontrado");
  //     }
  //     equipo.fecha_inactivacion = new Date().toISOString();
  //     equipo.actualizarFechaActualizacion();
  //     await this.equipoWriteRepository.guardar(equipo);
  //   }
}
