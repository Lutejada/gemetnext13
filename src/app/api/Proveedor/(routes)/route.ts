import { auth } from "@/lib/getSession";
import { validarCrearProveedor } from "../application/dto/crearProveedorDto";
import { CrearProveedorImp } from "../application/use-cases/writer/crearProveedor";
import { ProveedorService } from "../dominio/service";
import { ProveedorReadRepositoryImp } from "../infrastructure/reader/proveedorReadRepositoryImp";
import { ProveedorWriteRepositoryImp } from "../infrastructure/writer/proveedorWriteRepositoryImp";
import { NextResponse } from "next/server";
import { errorHandler } from "../../common/errors/error.handler";
import { ListarProvedoresUseCaseImp } from "../application/use-cases/reader/listarProveedores";
import { validarEditarProveedor } from "../application/dto/editarProveedorDTO";
import { EditarProveedorImp } from "../application/use-cases/writer/editarProveedor";
import { tr } from "date-fns/locale";
const proveedorReadRepo = new ProveedorReadRepositoryImp();
const proveedorWriteRepo = new ProveedorWriteRepositoryImp();
const proveedorService = new ProveedorService(
  proveedorWriteRepo,
  proveedorReadRepo
);
const crearProvedor = new CrearProveedorImp(proveedorService);
const listarProveedores = new ListarProvedoresUseCaseImp(proveedorService);
const editarProveedor = new EditarProveedorImp(proveedorService);
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dto = validarCrearProveedor(body);
    const session = await auth();

    await crearProvedor.execute(session.user.cliente_id, dto);
    return NextResponse.json({ msg: "proveedor creado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const dto = validarEditarProveedor(body);
    const session = await auth();
    await editarProveedor.execute(session.user.cliente_id, dto);
    return NextResponse.json({ msg: "proveedor editado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(_request: Request) {
  try {
    const session = await auth();
    const listado = await listarProveedores.execute(session.user.cliente_id);
    return NextResponse.json(listado);
  } catch (error: any) {
    return errorHandler(error);
  }
}
