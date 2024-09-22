import { EjecucionEquipo } from "../entity";

export interface EjecucionEquipoReadRepository {}
export interface EjecucionEquipoWriteRepository {
  crear(ejecucionEquipo: Omit<EjecucionEquipo, "id">): Promise<void>;
}
