import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { crearProgramacionEquipos } from "../../servicios/crearProgramacionEquipo";
import { listarEquiposProgramados } from "../../servicios/listarEquiposProgramados";
import { ObtenerDatosDto } from "@/app/api/common/types";
import { string } from "zod";
import { auth } from "@/lib/getSession";
import { validarCrearProgramacion } from "../../dtos/crearProgramation.dto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearProgramacion(body)
    const session = await auth();
    await crearProgramacionEquipos(body, session.user.cliente_id);
    return NextResponse.json({ msg: "equipo programado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const dto: ObtenerDatosDto = {
      page: Number(page) || 1,
    };
    const session = await auth();
    const programacion = await listarEquiposProgramados(
      session.user.cliente_id,
      dto
    );
    return NextResponse.json(programacion);
  } catch (error: any) {
    return errorHandler(error);
  }
}
