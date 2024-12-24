import { z } from "zod";
import { Role } from "../../dominio/entity";

export interface CrearUsuarioDTO {
  usuario: string;
  nombre: string;
  apellido: string;
  cargo: string;
  rol: Role;
  correo: string;
  password: string;
}

export const schema = z.object({
  usuario: z.string(),
  nombre: z.string(),
  apellido: z.string(),
  cargo: z.string(),
  rol: z.enum([
    Role.Metrologo,
    Role.Auxiliar,
    Role.Consulta,
    Role.Cordinador,
  ]),
  correo: z.string().email(),
  password: z.string(),
});
export const validarCrearUsuarioDto = (usuario: CrearUsuarioDTO) => {
  return schema.parse(usuario) as CrearUsuarioDTO;
};
