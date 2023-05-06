import { NextResponse } from "next/server";
import { equipoRespositoryImpl } from "../infraestructura/equipoRespositorioImp";
import { obtenerEquipo } from "../aplicacion/obtenerEquipo";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    console.log(params.id);
    const repositorio = equipoRespositoryImpl();
    const equipo = await obtenerEquipo(repositorio, params.id);
    return NextResponse.json(equipo);
  } catch (error:any) {
    console.log(error.message);
    console.log(error.cause);
    if(error.cause === 'negocio'){
        return NextResponse.json({ error: error.message },{status:400});
    }
    return  NextResponse.json({error:error.message},{status:500})
  }
}
