import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { validarCrearComplementarios } from "../../dtos/crearDatosComplementarios.dto";
import { crearDatosComplementarios } from "../../servicios/crearDatosComplementarios";
import { validarEditarComplementarios } from "../../dtos/editarDatosComplementarios.dto";
import { editarDatosComplementarios } from "../../servicios/editarDatosComplementarios";
import { auth } from "@/lib/getSession";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearComplementarios(body);
    const session = await auth();
    const complementarios = await crearDatosComplementarios(
      body,
      session.user.cliente_id
    );
    return NextResponse.json({ msg: "patron creado creado", complementarios });
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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    validarEditarComplementarios(body);
    const session = await auth();
    const complementarios = await editarDatosComplementarios(
      body,
      session.user.cliente_id
    );
    return NextResponse.json({ msg: "Datos editados", complementarios });
  } catch (error: any) {
    return errorHandler(error);
  }
}
