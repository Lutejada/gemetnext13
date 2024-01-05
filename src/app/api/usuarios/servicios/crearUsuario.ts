import { encodePassword } from "@/lib/password-hash";
import { CrearUsuarioDto } from "../dtos/crearUsuario.dto";
import { UsuarioExiste } from "../errors";
import { usuarioResitorio } from "../repositorio/usuarioRepositorio";
import { obtenerClientePorId } from "../../cliente/servicios/obtenerClientePorId";

export const crearUsuario = async (dto: CrearUsuarioDto) => {
  await obtenerClientePorId(dto.clienteId);

  const usuario = await usuarioResitorio.obtenerUsuarioCorreo(
    dto.correo,
    dto.clienteId
  );
  if (usuario) {
    throw new UsuarioExiste();
  }

  dto.password = await encodePassword(dto.password);
  await usuarioResitorio.crearUsuario(dto);
};
