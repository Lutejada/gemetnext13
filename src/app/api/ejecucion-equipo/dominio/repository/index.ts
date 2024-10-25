import { EjecucionEquipo } from "../../dominio/entity";

export interface EjecucionEquipoReadRepository {
  listar(clienteId: string): Promise<EjecucionEquipo[]>;
}
export interface EjecucionEquipoWriteRepository {
  crear(
    ejecucionEquipo: Omit<EjecucionEquipo, "id">
  ): Promise<
    Omit<EjecucionEquipo, "cliente" | "responsable" | "programacionEquipo">
  >;
}
