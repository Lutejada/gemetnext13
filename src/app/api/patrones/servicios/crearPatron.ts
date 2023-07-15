import { CrearPatronDto } from "../dtos/crear";
import { patronRepositorio } from "../repositorio/patronRepositorio";

export const crearPatron = (dto: CrearPatronDto) => {
  return patronRepositorio.crearPatron(dto);
};
