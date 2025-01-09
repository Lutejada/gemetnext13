import { encodePassword } from "@/lib/password-hash";
import { Usuario } from "../../dominio/entity";
import { UsuarioService } from "../../dominio/service";
import { generateRandomPassword } from "../../../../../lib/password-hash";
import { EmailService } from "../../../common/email/index";
import { sendPasswordcreate } from "@/app/api/common/email/templates/sendPasswordcreate";
import { CrearUsuarioDTO } from "../dto/crearUsuario.DTO";
import { UsuarioExiste } from "../../dominio/errors";

interface CrearUsuario {
  execute(clienteId: string, dto: CrearUsuarioDTO): Promise<void>;
}

export class CrearUsuarioImp implements CrearUsuario {
  constructor(
    private usuarioService: UsuarioService,
    private emailService: EmailService
  ) {}
  async execute(clienteId: string, dto: CrearUsuarioDTO): Promise<void> {
    const user = await this.usuarioService.obtenerUsuarioPorCorreo(dto.correo, clienteId);
    if (user) {
      throw new UsuarioExiste();
    }
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
    await this.usuarioService.crearUsuario(usuarioToCreate);
    await this.emailService.sendEmail({
      from: "noreply@gemet.cloud>",
      subject: "Credenciales de ingreso",
      to: [dto.correo],
      template: sendPasswordcreate({ password: ramdonpassword }),
    });
  }
}
