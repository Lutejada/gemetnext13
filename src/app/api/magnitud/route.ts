import { NextResponse } from "next/server";
import { errorHandler } from "../common/errors/error.handler";
import { validarCrearMagnitud } from "./dtos/crearMagnitud.dto";
import { crearMagnitud } from "./servicios/crearMagnitud";
import { obtenerMagnitudes } from "./servicios/obtenerMaginitudes";
import { auth } from "@/lib/getSession";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearMagnitud(body);
    const session = await auth();
    const magnitud = await crearMagnitud(body, session.user.clienteId);
    return NextResponse.json({ msg: "magnitud creada", magnitud });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(_request: Request) {
  try {
    const session = await auth();
    const magnitudes = await obtenerMagnitudes(session.user.clienteId);
    return NextResponse.json(magnitudes);
  } catch (error: any) {
    return errorHandler(error);
  }
}
