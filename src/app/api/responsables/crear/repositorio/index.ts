import { crearResponsableDto } from "../dtos/crearResponsable.dto";
export interface ResponsableRepositorio {
  crearResponsable: (responsable: crearResponsableDto) => Promise<void>;
}
