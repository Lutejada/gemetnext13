import { CambiarPasswordDTO } from "../dto/cambiarPasswordDTO";
import { UsuarioService } from "../../dominio/service/index";
import { UsuarioNoExiste } from "../../dominio/errors";

interface CambiarPassword {
  execute(clienteId: string, dto: CambiarPasswordDTO): Promise<void>;
}

export class CambiarPasswordImp implements CambiarPassword {
  constructor(private usuarioService: UsuarioService) {}
  async execute(clienteId: string, dto: CambiarPasswordDTO): Promise<void> {
    const usuario = await this.usuarioService.obtenerUsuarioPorCorreo(
      dto.correo,
      clienteId
    );

    if (!usuario) {
      throw new UsuarioNoExiste();
    }
    //validar que el password temporal sea correcto
    //encode el nuevo password
    //actualizar con el password nuevo y cambiar el estado de la priedad emailVerificado
  }
}
