import { CrearFrecuenciaDto } from "../dtos/crear";
import { frecuenciaRepositorio } from "../repositorio/frecuenciaResposito";

export const crearFrecuencia = (dto: CrearFrecuenciaDto, clienteId: string) => {
  return frecuenciaRepositorio.crearFrecuencia(dto, clienteId);
};
