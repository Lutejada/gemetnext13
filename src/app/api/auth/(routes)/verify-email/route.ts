import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { validarVerifyNewUser } from "../../dto/verifyEmailDTO";
import { UsuarioReadRepositoryImp } from "@/app/api/usuarios/infrastructure/read/usuarioReadRepositoryImp";
import { UsuarioWriteRepositoryImp } from "@/app/api/usuarios/infrastructure/write/usuarioWriteRepositoryImp";
import { ClienteReadRepositoryImp } from "@/app/api/cliente/infrastructure/read/clienteReadRepositoryImp";
import { UsuarioService } from "@/app/api/usuarios/dominio/service";
import { ClienteService } from "@/app/api/cliente/dominio/service";
import { AuthService } from "../../service";

const usuarioReadRepositoryImp = new UsuarioReadRepositoryImp();
const usuarioWriteRepositoryImp = new UsuarioWriteRepositoryImp();
const clienteReadRepositoryImp = new ClienteReadRepositoryImp();
const usuarioService = new UsuarioService(
  usuarioReadRepositoryImp,
  usuarioWriteRepositoryImp
);
const clienteService = new ClienteService(clienteReadRepositoryImp);
const authService = new AuthService(usuarioService, clienteService);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dto = validarVerifyNewUser(body);
    await authService.verifyNewUser(dto);
    return NextResponse.json({ message: "Usuario verificado" }, { status: 200 });
  } catch (error: any) {
    return errorHandler(error);
  }
}
