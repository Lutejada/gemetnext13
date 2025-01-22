import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { validarChangePasswordDTO } from "../../dto/changePasswordDTO";
import { UsuarioReadRepositoryImp } from "@/app/api/usuarios/infrastructure/read/usuarioReadRepositoryImp";
import { UsuarioWriteRepositoryImp } from "@/app/api/usuarios/infrastructure/write/usuarioWriteRepositoryImp";
import { ClienteReadRepositoryImp } from "@/app/api/cliente/infrastructure/read/clienteReadRepositoryImp";
import { UsuarioService } from "@/app/api/usuarios/dominio/service";
import { ClienteService } from "@/app/api/cliente/dominio/service";
import { AuthService } from "../../service";
import { PasswordResetTokenService } from "../../service/passwordResetTokenService";
import { PasswordResetTokenRepositoryImp } from "../../repository/passwordResetTokenRepositoryIm";
import { validarforgotPasswordDTO } from "../../dto/forgotPasswordDTO";
import { EmailService } from "../../../common/email/index";

const usuarioReadRepositoryImp = new UsuarioReadRepositoryImp();
const usuarioWriteRepositoryImp = new UsuarioWriteRepositoryImp();
const clienteReadRepositoryImp = new ClienteReadRepositoryImp();
const usuarioService = new UsuarioService(
  usuarioReadRepositoryImp,
  usuarioWriteRepositoryImp
);
const passwordResetTokenRepositoryImp = new PasswordResetTokenRepositoryImp();
const passwordResetTokenService = new PasswordResetTokenService(
  passwordResetTokenRepositoryImp
);
const emailService = new EmailService();
const clienteService = new ClienteService(clienteReadRepositoryImp);
const authService = new AuthService(
  usuarioService,
  clienteService,
  passwordResetTokenService,
  emailService
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dto = validarforgotPasswordDTO(body);
    await authService.forgotPassword(dto);
    return NextResponse.json({ message: "password change" }, { status: 201 });
  } catch (error: any) {
    return errorHandler(error);
  }
}
