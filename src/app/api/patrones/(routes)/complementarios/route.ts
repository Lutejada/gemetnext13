import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { validarCrearDatosMetrologicos } from "../../dtos/crearDatosMetrologicos";
import { crearDatosMetrologicos } from "../../servicios/crearDatosMetrologicos";
import { validarCrearComplementarios } from "../../dtos/crearDatosComplementarios.dto";
import { crearDatosComplementarios } from "../../servicios/crearDatosComplementarios";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearComplementarios(body)
    const complementarios = await crearDatosComplementarios(body)
    return NextResponse.json({ msg: "patron creado creado" , complementarios });
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
