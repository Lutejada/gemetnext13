import { encodePassword } from "@/lib/password-hash";
import { Usuario } from "../../dominio/entity";
import { UsuarioService } from "../../dominio/service";
import { CrearUsuarioDTO } from "../dto/crearUsurio.DTO";
import { generateRandomPassword } from "../../../../../lib/password-hash";

interface CrearUsuario {
  execute(clienteId: string, dto: CrearUsuarioDTO): Promise<void>;
}

export class CrearUsuarioImp implements CrearUsuario {
  constructor(private usuarioService: UsuarioService) {}
  async execute(clienteId: string, dto: CrearUsuarioDTO): Promise<void> {
    const usuarioToCreate = new Usuario({
      usuario: dto.usuario,
      nombre: dto.nombre,
      apellido: dto.apellido,
      cargo: dto.cargo,
      rol: dto.rol,
      correo: dto.correo,
      cliente: { id: clienteId, nombre: clienteId },
    });
    const ramdonpassword = generateRandomPassword();
    const encodedPassword = await encodePassword(ramdonpassword);
    usuarioToCreate.password = encodedPassword;
    return this.usuarioService.crearUsuario(usuarioToCreate);
  }
}
