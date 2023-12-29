import { encodePassword } from "@/lib/password-hash";
import { CrearUsuarioDto } from "../dtos/crearUsuario.dto";
import { UsuarioExiste } from "../errors";
import { usuarioResitorio } from "../repositorio/usuarioRepositorio";

export const crearUsuario = async (dto: CrearUsuarioDto) => {
  const usuario = await usuarioResitorio.obtenerUsuarioCorreo(dto.correo);
  if (usuario) {
    throw new UsuarioExiste();
  }

  dto.password = await encodePassword(dto.password);
  await usuarioResitorio.crearUsuario(dto);
};
