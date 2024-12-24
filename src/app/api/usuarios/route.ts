import { NextResponse } from "next/server";
import { errorHandler } from "../common/errors/error.handler";
import { CrearUsuarioImp } from "./use-cases/write/crearUsuario";
import { UsuarioService } from "./dominio/service/index";
import { UsuarioReadRepositoryImp } from "./infrastructure/read/usuarioReadRepositoryImp";
import { UsuarioWriteRepositoryImp } from "./infrastructure/write/usuarioWriteRepositoryImp";
import { validarCrearUsuarioDto } from "./use-cases/dto/crearUsurio.DTO";
import { auth } from "../../../lib/getSession";
import { ListarUsuariosImp } from "./use-cases/read/listarUsurios";

const usuarioWriteRepositoryImp = new UsuarioWriteRepositoryImp();
const usuarioReadRepositoryImp = new UsuarioReadRepositoryImp();
const usuarioService = new UsuarioService(
  usuarioReadRepositoryImp,
  usuarioWriteRepositoryImp
);
const crearUsuarioImp = new CrearUsuarioImp(usuarioService);
const listarUsuariosImp = new ListarUsuariosImp(usuarioService);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dto = validarCrearUsuarioDto(body);
    const session = await auth();
    await crearUsuarioImp.execute(session.user.cliente_id, dto);
    return NextResponse.json({ msg: "usuario creado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(_request: Request) {
  try {
    const session = await auth();
    const usuarios = await listarUsuariosImp.execute(session.user.cliente_id);
    return NextResponse.json(usuarios);
  } catch (error: any) {
    return errorHandler(error);
  }
}
