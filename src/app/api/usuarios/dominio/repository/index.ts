import { Role, Usuario } from "../entity";

export interface UsuarioReadRepository {
  listarUsuarios(clienteId: string): Promise<Usuario[]>;
  listarUsuarioPorRoles(clienteId: string, roles: Role[]): Promise<Usuario[]>;
  obtenerPorCorreo(correo: string, clienteId: string): Promise<Usuario | null>;
  obtenerPorId(usuarioId: string): Promise<Usuario | null>;
}

export interface UsuarioWriteRepository {
  crearUsuarios(usuario: Usuario): Promise<void>;
  actualizarUsuario(usuario: Usuario): Promise<void>;
}
