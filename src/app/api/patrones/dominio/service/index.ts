import { PatronYaExiste } from "../errors";
import { PatronReadRepository } from "../repository";

export class PatronService {
  constructor(private equipoReadRepository: PatronReadRepository) {}

  async obtenerPatronCodigo(clienteId: string, equipoId: string) {
    const equipo = await this.equipoReadRepository.obtenerPorID(
      clienteId,
      equipoId
    );
    if (equipo) {
      throw new PatronYaExiste();
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
