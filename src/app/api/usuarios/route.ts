import { NextResponse } from "next/server";
import { errorHandler } from "../common/errors/error.handler";
import { CrearUsuarioImp } from "./use-cases/write/crearUsuario";
import { UsuarioService } from "./dominio/service/index";
import { UsuarioReadRepositoryImp } from "./infrastructure/read/usuarioReadRepositoryImp";
import { UsuarioWriteRepositoryImp } from "./infrastructure/write/usuarioWriteRepositoryImp";
import { auth } from "../../../lib/getSession";
import { ListarUsuariosImp } from "./use-cases/read/listarUsurios";
import { EmailService } from "../common/email/index";
import { validarCrearUsuarioDto } from "./use-cases/dto/crearUsuario.DTO";
import { AuthService } from "../auth/service";
import { ClienteService } from "../cliente/dominio/service/index";
import { ClienteReadRepositoryImp } from "../cliente/infrastructure/read/clienteReadRepositoryImp";
import { PasswordResetTokenService } from "../auth/service/passwordResetTokenService";
import { PasswordResetTokenRepository } from "../auth/repository";
import { PasswordResetTokenRepositoryImp } from "../auth/repository/passwordResetTokenRepositoryIm";
import { Cliente } from "../cliente/dominio/entity";

const usuarioWriteRepositoryImp = new UsuarioWriteRepositoryImp();
const usuarioReadRepositoryImp = new UsuarioReadRepositoryImp();
const usuarioService = new UsuarioService(
  usuarioReadRepositoryImp,
  usuarioWriteRepositoryImp
);
const clienteReadRepositoryImp = new ClienteReadRepositoryImp();
const clienteService = new ClienteService(clienteReadRepositoryImp);
const emailService = new EmailService();
const passwordResetTokenRepository = new PasswordResetTokenRepositoryImp();
const passwordResetTokenService = new PasswordResetTokenService(
  passwordResetTokenRepository
);
const authService = new AuthService(usuarioService, clienteService);
const crearUsuarioImp = new CrearUsuarioImp(
  usuarioService,
  emailService,
  authService,
  passwordResetTokenService
);
const listarUsuariosImp = new ListarUsuariosImp(usuarioService);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dto = validarCrearUsuarioDto(body);
    const session = await auth();
    const cliente: Cliente = {
      id: session.user.clienteId,
      nombre: session.user.nombreCliente,
    };
    await crearUsuarioImp.execute(cliente, dto);
    return NextResponse.json({ msg: "usuario creado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(_request: Request) {
  try {
    const session = await auth();
    const usuarios = await listarUsuariosImp.execute(session.user.clienteId);
    return NextResponse.json(usuarios);
  } catch (error: any) {
    return errorHandler(error);
  }
}
