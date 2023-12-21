import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { obtenerPatronPorCodigo } from "../../servicios/obtenerPatronPorCodigo";

export async function GET(
  _request: Request,
  { params }: { params: { codigo: string } }
) {
  try {
    const equipo = await obtenerPatronPorCodigo(params.codigo);
    return NextResponse.json(equipo);
  } catch (error: any) {
    return errorHandler(error);
  }
}
