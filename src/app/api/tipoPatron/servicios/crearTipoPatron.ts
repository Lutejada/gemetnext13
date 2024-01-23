import { CrearTipoPatronDto } from "../dtos/crear";
import { tipoPatronRespositorio } from "../repositorio/tipoPatronRepositorio";

export const crearTipoPatron = (dto: CrearTipoPatronDto, clienteId: string) => {
  return tipoPatronRespositorio.creatTipoPatron(dto, clienteId);
};
