import { UsuarioService } from "../../dominio/service";
import { ListarUsuriosDTO } from "../dto/listarUsuarios.DTO";

interface ListarUsuarios {
  execute(clienteId: string): Promise<ListarUsuriosDTO[]>;
}

export class ListarUsuariosImp implements ListarUsuarios {
  constructor(private usuarioService: UsuarioService) {}
  async execute(clienteId: string): Promise<ListarUsuriosDTO[]> {
    const usuarios = await this.usuarioService.listarUsuarios(clienteId);

    return usuarios.map((usuario) => ListarUsuriosDTO.fromDomain(usuario));
  }
}
