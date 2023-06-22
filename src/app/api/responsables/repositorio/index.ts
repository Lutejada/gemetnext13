import { CrearResponsableDto } from "../dtos/crearResponsable.dto";
import { Responsable } from "../types";
export interface ResponsableRepositorio {
  crearResponsable: (responsable: CrearResponsableDto) => Promise<void>;
  obtenerResponsables: () => Promise<Responsable[]>;
  obtenerResponsableIdent: (
    identificacion: string
  ) => Promise<Responsable | null>;
  obtenerResponsableID:(id:string)=>Promise<Responsable | null>
}
