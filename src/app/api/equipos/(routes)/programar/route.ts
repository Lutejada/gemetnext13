import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { crearProgramacionEquipos } from "../../application/servicios/crearProgramacionEquipo";
import { ObtenerDatosDto } from "@/app/api/common/types";
import { auth } from "@/lib/getSession";
import { validarCrearProgramacion } from "../../application/dtos/crearProgramation.dto";
import { EquipoReadRepositoryImp } from "../../infrastructure/reader/equipoReadRepository";
import { ListarEquiposProgramados } from "../../application/use-cases/reader/listarEquiposProgramados";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearProgramacion(body);
    const session = await auth();
    await crearProgramacionEquipos(body, session.user.cliente_id);
    return NextResponse.json({ msg: "equipo programado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}
const repo = new EquipoReadRepositoryImp();
const listarEquiposProgramados = new ListarEquiposProgramados(repo);
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const dto: ObtenerDatosDto = {
      page: Number(page) || 1,
    };
    const session = await auth();
    const programacion = await listarEquiposProgramados.execute(
      session.user.cliente_id
    );
    return NextResponse.json(programacion);
  } catch (error: any) {
    return errorHandler(error);
  }
}
