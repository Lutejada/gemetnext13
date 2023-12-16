import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { crearProgramacionEquipos } from "../../servicios/crearProgramacionEquipo";
import { listarEquiposProgramados } from "../../servicios/listarEquiposProgramados";
import { ObtenerDatosDto } from "@/app/api/common/types";
import { string } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await crearProgramacionEquipos(body);
    return NextResponse.json({ msg: "equipo creado" });
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
    const programacion = await listarEquiposProgramados(dto);
    return NextResponse.json(programacion);
  } catch (error: any) {
    return errorHandler(error);
  }
}
