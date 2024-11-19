import { NextResponse } from "next/server";
import { crearPatron } from "../servicios/crearPatron";
import { errorHandler } from "../../common/errors/error.handler";
import { validarCrearPatron } from "../dtos/crearPatrones";
import { queryValuesDTO } from "../../common/types";
import { obtenerPatrones } from "../servicios/obtenerPatrones";
import { ObtenerPatronesDtoOutput } from "../dtos/obtenerPatrones.dto.output";
import { validarEditarBasicos } from "../dtos/editarBasicos.dto";
import { editarDatosBasicos } from "../servicios/editarDatosBasicos";
import { auth } from "@/lib/getSession";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearPatron(body);
    const session = await auth();
    const patron = await crearPatron(body, session.user.cliente_id);
    return NextResponse.json({ msg: "patron creado creado", patron });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    validarEditarBasicos(body);
    const session = await auth();
    await editarDatosBasicos(body, session.user.cliente_id);
    return NextResponse.json({ msg: "patron editado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const dto: queryValuesDTO = {
      page: Number(page) || 1,
    };
    const session = await auth();
    const response = await obtenerPatrones(session.user.cliente_id, dto);
    return NextResponse.json<ObtenerPatronesDtoOutput>(response);
  } catch (error: any) {
    return errorHandler(error);
  }
}
