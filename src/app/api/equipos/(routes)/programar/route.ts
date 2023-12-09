import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { crearProgramacionEquipos } from "../../servicios/crearProgramacionEquipo";
import { listarEquiposProgramados } from "../../servicios/listarEquiposProgramados";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await crearProgramacionEquipos(body);
    return NextResponse.json({ msg: "equipo creado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(_request: Request) {
  try {
    const programacion = await listarEquiposProgramados();
    return NextResponse.json(programacion);
  } catch (error: any) {
    return errorHandler(error);
  }
}
