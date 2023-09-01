import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { validarCrearDatosMetrologicos } from "../../dtos/crearDatosMetrologicos";
import { crearDatosMetrologicos } from "../../servicios/crearDatosMetrologicos";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ msg: "patron creado creado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(_request: Request) {
  try {
  } catch (error: any) {
    return errorHandler(error);
  }
}
