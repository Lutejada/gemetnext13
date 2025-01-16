import bcrypt from "bcrypt";
import * as crypto from "crypto";
import { UsuarioService } from "../../usuarios/dominio/service/index";
import { ClienteService } from "../../cliente/dominio/service/index";
import { EmailNotVerified, PasswordOrEmailIncorrect } from "../errors";
import { VerifyNewUserDTO } from "../dto/verifyEmailDTO";

interface Credentials {
  cliente: string;
  correo: string;
  password: string;
}

export interface UserAuth {
  id: string;
  nombre: string;
  correo: string;
  nombreCliente: string;
  clienteId: string;
  rol: string;
}
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private clienteService: ClienteService
  ) {}

  async autenticar(credentials: Credentials): Promise<UserAuth> {
    const cliente = await this.clienteService.validarClienteExiste(
      credentials.cliente
    );

    const usuario = await this.usuarioService.validarUsuarioExiste(
      credentials.correo,
      cliente.id
    );

    const valido = await this.isValidPassword(
      credentials.password,
      usuario.password
    );
    if (!valido) {
      throw new PasswordOrEmailIncorrect();
    }
    if (usuario.correoVerificado === false) {
      throw new EmailNotVerified();
    }

    return {
      clienteId: cliente.id,
      id: usuario.id,
      nombre: usuario.nombre,
      nombreCliente: cliente.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
    };
  }

  async verifyNewUser(input: VerifyNewUserDTO) {
    const cliente = await this.clienteService.validarClienteExiste(
      input.clienteNombre
    );

    const usuario = await this.usuarioService.validarUsuarioExiste(
      input.correo,
      cliente.id
    );

    const valido = await this.isValidPassword(
      input.verifiedCode,
      usuario.password
    );
    if (!valido) {
      console.error("Password incorrecto");
      throw new PasswordOrEmailIncorrect();
    }

    const newPasswordEndode = await this.encodePassword(input.password);
    usuario.password = newPasswordEndode;
    usuario.correoVerificado = true;
    await this.usuarioService.actualizarUsuario(usuario);
  }

  public encodePassword = (password: string) => {
    return bcrypt.hash(password, 10);
  };

  public isValidPassword = (currentPassword: string, dbPassword: string) => {
    return bcrypt.compare(currentPassword, dbPassword);
  };

  public generateRandomPassword(length: number = 8): string {
    return crypto.randomBytes(length).toString("base64").slice(0, length);
  }
}
