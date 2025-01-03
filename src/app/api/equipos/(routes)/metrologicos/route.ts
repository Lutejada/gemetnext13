import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { crearDatosMetrologicos } from "../../application/servicios/crearDatosMetrologicos";
import { validarCrearMetrologicos } from "../../application/dtos/crearDatosMetrologicos.dto";
import { validarEditarMetrologicos } from "../../application/dtos/editarDatosMetrologicos.dto";
import { editarDatosMetrologicos } from "../../application/servicios/editarDatosMetrologicos";
import { auth } from "@/lib/getSession";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearMetrologicos(body);
    const session = await auth();
    const datosMetrologicos = await crearDatosMetrologicos(
      body,
      session.user.clienteId
    );
    return NextResponse.json({ msg: "Datos guardados", datosMetrologicos });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    validarEditarMetrologicos(body);
    const session = await auth();
    await editarDatosMetrologicos(body, session.user.clienteId);
    return NextResponse.json({ msg: "Datos editados" });
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
