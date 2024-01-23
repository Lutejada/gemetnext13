import { Usuario } from "../dominio";
import { CrearUsuarioDto } from "../dtos/crearUsuario.dto";

export interface UsuarioRepositorio {
  crearUsuario: (dto: CrearUsuarioDto) => Promise<Usuario>;
  obtenerUsuarioCorreo(
    correo: string,
    clienteId: string
  ): Promise<Usuario | null>;
}
