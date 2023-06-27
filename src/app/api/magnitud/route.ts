import { NextResponse } from "next/server";
import { errorHandler } from "../common/errors/error.handler";
import { validarCrearMagnitud } from "./dtos/crearMagnitud.dto";
import { crearMagnitud } from "./servicios/crearMagnitud";
import { obtenerMagnitudes } from "./servicios/obtenerMaginitudes";

export async function POST(request: Request) {
    try {
      const body = await request.json();
      validarCrearMagnitud(body)
      const magnitud = await crearMagnitud(body)
      return NextResponse.json({msg:'magnitud creada',magnitud})
    } catch (error: any) {
      return errorHandler(error);
    }
  }
  
  
  export async function GET(_request: Request) {
    try {
      const magnitudes = await obtenerMagnitudes()
      return NextResponse.json(magnitudes)
    } catch (error: any) {
      return errorHandler(error);
    }
  }
  