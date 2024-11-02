import { EjecucionEquipo } from "../../dominio/entity";

export interface EjecucionEquipoReadRepository {
  listar(clienteId: string): Promise<EjecucionEquipo[]>;
}
export interface EjecucionEquipoWriteRepository {
  crear(
    ejecucionEquipo: EjecucionEquipo
  ): Promise<
    Omit<EjecucionEquipo, "cliente" | "responsable" | "programacionEquipo">
  >;
}
