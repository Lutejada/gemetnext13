import { Role, Usuario } from "../entity";
import { InvalidUserRole, UsuarioExiste } from "../errors";
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

    if(usuario.rol === Role.Admin){
        throw new InvalidUserRole()
    }
    await this.usuarioWriteRepository.crearUsuarios(usuario);
  }

  async obtenerUsuarioPorCorreo(correo: string, clienteId: string) {
    return await this.usuarioReadRepository.obtenerCorreo(correo, clienteId);
  }

  async listarUsuarios(clienteId: string) {
    return await this.usuarioReadRepository.listarUsuarios(clienteId);
  }
}
