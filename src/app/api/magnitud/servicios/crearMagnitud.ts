import { CrearMagnitudDto } from "../dtos/crearMagnitud.dto";
import { magnitudRespositorio } from "../repositorio/magnitudRespositorio";

export const crearMagnitud = (dto: CrearMagnitudDto, clienteId: string) => {
  return magnitudRespositorio.crearMagnitud(dto, clienteId);
};
