import { NextResponse } from "next/server";
import { errorHandler } from "../common/errors/error.handler";
import { validarCrearFrecuencia } from "./dtos/crear";
import { crearFrecuencia } from "./servicios/crearFrecuencia";
import { obtenerfrecuencias } from "./servicios/obtenerFrecuencias";
import { auth } from "@/lib/getSession";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearFrecuencia(body);
    const session = await auth();
    const frecuencia = await crearFrecuencia(body, session.user.cliente_id);
    return NextResponse.json({ msg: "frecuencia creada", frecuencia });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(_request: Request) {
  try {
    const session = await auth();
    const frecuencias = await obtenerfrecuencias(session.user.cliente_id);
    return NextResponse.json(frecuencias);
  } catch (error: any) {
    return errorHandler(error);
  }
}
