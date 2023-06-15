import { NextResponse } from "next/server";
import { errorHandler } from "../common/errors/error.handler";
import { validarCrearResponsable } from "./dtos/crearResponsable.dto";
import { obtenerResponsables } from "./servicios/obtenerResponsables";
import { crearResponsable } from "./servicios/crearResponsable";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearResponsable(body);
    await crearResponsable(body);
    return NextResponse.json({msg:'equipo creado'})
  } catch (error: any) {
    return errorHandler(error);
  }
}


export async function GET(_request: Request) {
  try {
    const responsables = await obtenerResponsables()
    return NextResponse.json(responsables)
  } catch (error: any) {
    return errorHandler(error);
  }
}



