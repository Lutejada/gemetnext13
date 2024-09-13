import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { obtenerPorCodigo } from "../../application/servicios/ObtenerPorCodigo";
import { auth } from "@/lib/getSession";

export async function GET(
  _request: Request,
  { params }: { params: { codigo: string } }
) {
  try {
    const session = await auth();
    const equipo = await obtenerPorCodigo(
      params.codigo,
      session.user.cliente_id
    );
    return NextResponse.json(equipo);
  } catch (error: any) {
    return errorHandler(error);
  }
}
