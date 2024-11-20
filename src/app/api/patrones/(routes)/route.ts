import { NextResponse } from "next/server";
import { crearPatron } from "../servicios/crearPatron";
import { errorHandler } from "../../common/errors/error.handler";
import { validarCrearPatron } from "../dtos/crearPatrones";
import { queryValuesDTO } from "../../common/types";
import { obtenerPatrones } from "../servicios/obtenerPatrones";
import { ObtenerPatronesDtoOutput } from "../dtos/obtenerPatrones.dto.output";
import { validarEditarBasicos } from "../dtos/editarBasicos.dto";
import { editarDatosBasicos } from "../servicios/editarDatosBasicos";
import { auth } from "@/lib/getSession";
import { PatronRepositoryReadImp } from "../infraestructure/repository/read";
import { ListarPatronesUseCaseImp } from "../application/use-cases/listarPatrones";

const PatronReadRepository = new PatronRepositoryReadImp();
const listarPatronsUseCase = new ListarPatronesUseCaseImp(PatronReadRepository);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearPatron(body);
    const session = await auth();
    const patron = await crearPatron(body, session.user.cliente_id);
    return NextResponse.json({ msg: "patron creado creado", patron });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    validarEditarBasicos(body);
    const session = await auth();
    await editarDatosBasicos(body, session.user.cliente_id);
    return NextResponse.json({ msg: "patron editado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const termino = searchParams.get("termino");
    const valor = searchParams.get("valor");
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 5);
    const session = await auth();
    const patrones = await listarPatronsUseCase.execute(
      session.user.cliente_id,
      {
        limit,
        page,
        valor,
        termino,
      }
    );
    return NextResponse.json(patrones);
  } catch (error: any) {
    return errorHandler(error);
  }
}
