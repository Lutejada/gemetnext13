import { CrearActividadDto } from "../dtos/crear";
import { actividadRepositorio } from "../repositorio/actividadRepositorio";

export const crearActividad = (dto: CrearActividadDto, clienteId: string) => {
  return actividadRepositorio.crearActividad(dto, clienteId);
};
