import { NextResponse } from "next/server";
import { errorHandler } from "../common/errors/error.handler";
import { validarCrearActividad } from "./dtos/crear";
import { crearActividad } from "./servicios/crearActividad";
import { obtenerActividades } from "./servicios/obtenerActividades";
import { auth } from "@/lib/getSession";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearActividad(body);
    const session = await auth();
    const actividad = await crearActividad(body, session.user.cliente_id);
    return NextResponse.json({ msg: "equipo creado", actividad });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(_request: Request) {
  try {
    const session = await auth();
    const actividades = await obtenerActividades(session.user.cliente_id);
    return NextResponse.json(actividades);
  } catch (error: any) {
    return errorHandler(error);
  }
}
