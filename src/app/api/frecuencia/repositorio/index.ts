import { Frecuencia } from "../dominio";
import { CrearFrecuenciaDto } from "../dtos/crear";

export interface FrecuenciaRepositorio {
  crearFrecuencia: (
    dto: CrearFrecuenciaDto,
    clienteId: string
  ) => Promise<Frecuencia>;
  obtenerFrecuencias: (clienteId: string) => Promise<Frecuencia[]>;
}

