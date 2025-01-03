import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { validarCrearDatosMetrologicos } from "../../dtos/crearDatosMetrologicos";
import { crearDatosMetrologicos } from "../../servicios/crearDatosMetrologicos";
import { validarEditarMetrologicos } from "../../dtos/editarDatosMetrologicos.dto";
import { editarDatosMetrologicos } from "../../servicios/editarDatosMetrologicos";
import { auth } from "@/lib/getSession";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearDatosMetrologicos(body);
    const session = await auth();
    const metrologicos = await crearDatosMetrologicos(
      body,
      session.user.clienteId
    );
    return NextResponse.json({ msg: "patron creado creado", metrologicos });
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
