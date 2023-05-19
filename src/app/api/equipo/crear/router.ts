import { NextResponse } from "next/server";
import { equipoRespositoryImpl } from "../infraestructura/equipoRespositorioImp";
import { crearEquipo } from "../aplicacion/crearEquipo";

export async function POST(request: Request) {
  try {
    request.json();
    const repositorio = equipoRespositoryImpl();
    const equipo = await crearEquipo(repositorio);
    return NextResponse.json(equipo);
  } catch (error: any) {
    console.log(error.message);
    console.log(error.cause);
    if (error.cause === "negocio") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
