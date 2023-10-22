import { NextResponse } from "next/server";
import { errorHandler } from "../../common/errors/error.handler";
import { validarCrearEquipo } from "../dtos/crearEquipo.dto";
import { crearEquipo } from "../servicios/crearEquipo";
import { obtenerEquipos } from "../servicios/obtenerEquipos";
import { obtenerPorCodigo } from "../servicios/ObtenerPorCodigo";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearEquipo(body);
    const equipo = await crearEquipo(body);
    return NextResponse.json({ msg: "equipo creado", equipo });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
    const termino = searchParams.get("termino");
    const valor = searchParams.get("valor");
    const equipos = await obtenerEquipos(termino, valor);
    return NextResponse.json(equipos);
  } catch (error: any) {
    return errorHandler(error);
  }
}
