import bcrypt from "bcrypt";
import * as crypto from "crypto";
import { UsuarioService } from "../../usuarios/dominio/service/index";
import { ClienteService } from "../../cliente/dominio/service/index";
import {
  EmailNotVerified,
  PasswordOrEmailIncorrect,
  TokenExpired,
} from "../errors";
import { changePasswordDTO } from "../dto/changePasswordDTO";
import { PasswordResetTokenService } from "./passwordResetTokenService";
import { isAfter } from "date-fns";

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
    private clienteService: ClienteService,
    private passwordResetTokenService: PasswordResetTokenService
  ) {}

  async autenticar(credentials: Credentials): Promise<UserAuth> {
    const cliente = await this.clienteService.validarClienteExiste(
      credentials.cliente
    );

    const usuario = await this.usuarioService.validarUsuarioExiste(
      credentials.correo,
      cliente.id
    );

    if (usuario.correoVerificado === false) {
      throw new EmailNotVerified();
    }
    const valido = await this.isValidPassword(
      credentials.password,
      usuario.password
    );
    if (!valido) {
      throw new PasswordOrEmailIncorrect();
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

  async changePassword(input: changePasswordDTO) {
    const token = await this.passwordResetTokenService.getToken(input.token);

    const hasExpired = token.expires < new Date();
    if (hasExpired) {
      throw new TokenExpired();
    }
    const cliente = await this.clienteService.validarClienteExiste(
      input.clienteNombre
    );

    const usuario = await this.usuarioService.validarUsuarioExiste(
      token.email,
      cliente.id
    );

    if (!usuario.correoVerificado) {
      //cambiar el estado del usuario a true
      usuario.correoVerificado = true;
    }

    //cambiar contraseña
    const newPasswordEndode = await this.encodePassword(input.password);
    usuario.password = newPasswordEndode;
    await this.usuarioService.actualizarUsuario(usuario);
    //borrar token
    await this.passwordResetTokenService.deleteToken(token.id);
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
