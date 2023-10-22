import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { obtenerPorCodigo } from "../../servicios/ObtenerPorCodigo";

export async function GET(
  _request: Request,
  { params }: { params: { codigo: string } }
) {
  try {
    const equipo = await obtenerPorCodigo(params.codigo);
    return NextResponse.json(equipo);
  } catch (error: any) {
    return errorHandler(error);
  }
}
