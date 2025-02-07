import { Role } from "../../dominio/entity";
import { UsuarioService } from "../../dominio/service";
import { ListarUsuriosDTO } from "../dto/listarUsuarios.DTO";

interface ListarUsuariosQuery {
  roles?: Role[];
}
interface ListarUsuarios {
  execute(
    clienteId: string,
    queryOptions: ListarUsuariosQuery
  ): Promise<ListarUsuriosDTO[]>;
}

export class ListarUsuariosImp implements ListarUsuarios {
  constructor(private usuarioService: UsuarioService) {}
  async execute(
    clienteId: string,
    queryOptions?: ListarUsuariosQuery
  ): Promise<ListarUsuriosDTO[]> {
    let usuarios;
    if (queryOptions?.roles) {
      usuarios = await this.usuarioService.listarUsuarioPorRoles(
        clienteId,
        queryOptions.roles
      );
    } else {
      usuarios = await this.usuarioService.listarUsuarios(clienteId);
    }

    return usuarios.map((usuario) => ListarUsuriosDTO.fromDomain(usuario));
  }
}
