import { object, string , nativeEnum } from "zod";
import { Role } from "../dominio";

export interface CrearUsuarioDto {
  usuario:string;
  nombre: string;
  apellido:string;
  cargo:string
  rol:Role;
  correo: string;
  password: string;
  clienteId: string;
}

export const validarCrearUsuarioDto = (dto: CrearUsuarioDto) => {
  object({
    correo: string().email(),
    clienteId: string().uuid(),
    password: string(),
    nombre: string(),
    apellido:string(),
    cargo:string(),
    usuario:string(),
    rol:nativeEnum(Role).optional()
  }).parse(dto);
};
