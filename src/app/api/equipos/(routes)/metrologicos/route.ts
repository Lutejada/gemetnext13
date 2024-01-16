import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { crearDatosMetrologicos } from "../../servicios/crearDatosMetrologicos";
import { validarCrearMetrologicos } from "../../dtos/crearDatosMetrologicos.dto";
import { validarEditarMetrologicos } from "../../dtos/editarDatosMetrologicos.dto";
import { editarDatosMetrologicos } from "../../servicios/editarDatosMetrologicos";
import { auth } from "@/lib/getSession";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearMetrologicos(body);
    const session = await auth();
    const datosMetrologicos = await crearDatosMetrologicos(
      body,
      session.user.cliente_id
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
    await editarDatosMetrologicos(body, session.user.cliente_id);
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
