import { NextResponse } from "next/server";
import { errorHandler } from "../../common/errors/error.handler";
import { validarCrearEquipo } from "../dtos/crearEquipo.dto";
import { crearEquipo } from "../servicios/crearEquipo";

export async function POST(request: Request) {
    try {
      const body = await request.json();
      validarCrearEquipo(body)
      const equipo = await crearEquipo(body)
      return NextResponse.json({msg:'equipo creado',equipo})
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
  