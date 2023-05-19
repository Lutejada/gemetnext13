import { NextResponse } from "next/server";
import { equipoRespositoryImpl } from "../infraestructura/equipoRespositorioImp";
import { obtenerEquipo } from "../aplicacion/obtenerEquipo";
import { errorHandler } from "../infraestructura/error.handler";
import { string } from "zod";
interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    string().uuid().parse(params.id);
    const repositorio = equipoRespositoryImpl();
    const equipo = await obtenerEquipo(repositorio, params.id);
    return NextResponse.json(equipo);
  } catch (error: any) {
    return errorHandler(error);
  }
}
