import { object, string } from "zod";

export interface CrearUsuarioDto {
  nombre: string;
  correo: string;
  password: string;
}

export const validarCrearUsuarioDto = (dto: CrearUsuarioDto) => {
  object({
    correo: string().email(),
    password: string(),
    nombre: string(),
  }).parse(dto);
};
