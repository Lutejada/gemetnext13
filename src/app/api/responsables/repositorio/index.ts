import { CrearResponsableDto } from "../dtos/crearResponsable.dto";
import { Responsable } from "../types";
export interface ResponsableRepositorio {
  crearResponsable: (
    responsable: CrearResponsableDto,
    clienteId: string
  ) => Promise<void>;
  obtenerResponsables: (clienteId: string) => Promise<Responsable[]>;
  obtenerResponsableIdent: (
    identificacion: string,
    clienteId: string
  ) => Promise<Responsable | null>;
  obtenerResponsableID: (
    id: string,
    clienteId: string
  ) => Promise<Responsable | null>;
}
