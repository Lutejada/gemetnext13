import { NextResponse } from "next/server";
import { errorHandler } from "../../common/errors/error.handler";
import { validarCrearEquipo } from "../application/dtos/crearEquipo.dto";
import { crearEquipo } from "../application/servicios/crearEquipo";
import { validarEditarEquipo } from "../application/dtos/editarEquipo.dto";
import { editarEquipo } from "../application/servicios/editarEquipo";
import { auth } from "@/lib/getSession";
import { ListarEquiposUseCaseImp } from "../application/use-cases/reader/listarEquipos";
import { EquipoReadRepositoryImp } from "../infrastructure/reader/equipoReadRepository";
import { ListarEquipoTerminoUseCaseImp } from "../application/use-cases/reader/listarEquiposPorTermino";
const EquipoReadRepository = new EquipoReadRepositoryImp();
const listarEquiposUseCase = new ListarEquiposUseCaseImp(EquipoReadRepository);
const listarEquipoTerminoUseCase = new ListarEquipoTerminoUseCaseImp(
  EquipoReadRepository
);
export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearEquipo(body);
    const session = await auth();
    const equipo = await crearEquipo(body, session.user.cliente_id);
    return NextResponse.json({ msg: "equipo creado", equipo });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    validarEditarEquipo(body);
    const session = await auth();
    await editarEquipo(body, session.user.cliente_id);
    return NextResponse.json({ msg: "equipo editado" });
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

    //validar terminos de busqueda

    const session = await auth();
    if (termino && valor) {
      const equiposTermino = await listarEquipoTerminoUseCase.execute(
        session.user.cliente_id,
        {
          limit,
          page,
          valor,
          termino,
        }
      );

      return NextResponse.json(equiposTermino);
    }
    const equipos = await listarEquiposUseCase.execute(
      session.user.cliente_id,
      {
        limit,
        page,
        valor,
        termino,
      }
    );
    return NextResponse.json(equipos);
  } catch (error: any) {
    return errorHandler(error);
  }
}
