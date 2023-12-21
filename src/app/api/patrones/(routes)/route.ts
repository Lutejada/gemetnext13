import { NextResponse } from "next/server";
import { crearPatron } from "../servicios/crearPatron";
import { errorHandler } from "../../common/errors/error.handler";
import { validarCrearPatron } from "../dtos/crearPatrones";
import { ObtenerDatosDto } from "../../common/types";
import { obtenerPatrones } from "../servicios/obtenerPatrones";
import { ObtenerPatronesDtoOutput } from "../dtos/obtenerPatrones.dto.output";
import { validarEditarBasicos } from "../dtos/editarBasicos.dto";
import { editarDatosBasicos } from "../servicios/editarDatosBasicos";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearPatron(body);
    const patron = await crearPatron(body);
    return NextResponse.json({ msg: "patron creado creado", patron });
  } catch (error: any) {
    return errorHandler(error);
  }
}


export async function PUT(request: Request) {
  try {
    const body = await request.json();
    validarEditarBasicos(body);
    await editarDatosBasicos(body)
    return NextResponse.json({ msg: "patron editado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const dto: ObtenerDatosDto = {
      page: Number(page) || 1,
    };
    const response = await obtenerPatrones(dto);
    return NextResponse.json<ObtenerPatronesDtoOutput>(response);
  } catch (error: any) {
    return errorHandler(error);
  }
}
