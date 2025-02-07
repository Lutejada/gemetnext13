import { Role, Usuario } from "../entity";
import { InvalidUserRole, UsuarioExiste, UsuarioNoExiste } from "../errors";
import {
  UsuarioReadRepository,
  UsuarioWriteRepository,
} from "../repository/index";
export class UsuarioService {
  constructor(
    private usuarioReadRepository: UsuarioReadRepository,
    private usuarioWriteRepository: UsuarioWriteRepository
  ) {}

  async crearUsuario(usuario: Usuario) {
    const user = await this.obtenerUsuarioPorCorreo(usuario.correo, usuario.id);
    if (user) {
      throw new UsuarioExiste();
    }

    if (usuario.rol === Role.Admin) {
      throw new InvalidUserRole();
    }
    await this.usuarioWriteRepository.crearUsuarios(usuario);
  }

  async obtenerUsuarioPorCorreo(correo: string, clienteId: string) {
    return await this.usuarioReadRepository.obtenerPorCorreo(correo, clienteId);
  }

  async obtenerUsuarioPorId(usuarioId: string) {
    return await this.usuarioReadRepository.obtenerPorId(usuarioId);
  }

  async validarUsuarioPorId(usuarioId: string) {
    const user = await this.obtenerUsuarioPorId(usuarioId);
    if (!user) {
      throw new UsuarioNoExiste();
    }
    return user;
  }

  async listarUsuarios(clienteId: string) {
    return await this.usuarioReadRepository.listarUsuarios(clienteId);
  }

  async listarUsuarioPorRoles(clienteId: string, roles: Role[]) {
    return await this.usuarioReadRepository.listarUsuarioPorRoles(
      clienteId,
      roles
    );
  }

  async validarUsuarioExiste(correo: string, clienteId: string) {
    const user = await this.obtenerUsuarioPorCorreo(correo, clienteId);
    if (!user) {
      throw new UsuarioNoExiste();
    }

    return user;
  }

  async actualizarUsuario(usuario: Usuario) {
    await this.usuarioWriteRepository.actualizarUsuario(usuario);
  }
}
