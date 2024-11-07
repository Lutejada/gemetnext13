import { EjecucionPatron } from "../../dominio/entity";

export interface EjecucionPatronReadRepository {
  listar(clienteId:string):Promise<EjecucionPatron[]>
}
export interface EjecucionPatronWriteRepository {
  crear(ejecucionPatron: EjecucionPatron): Promise<void>;
}
