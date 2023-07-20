import { NextResponse } from "next/server";
import { errorHandler } from "../common/errors/error.handler";
import { validarCrearTipoPatron } from "./dtos/crear";
import { crearTipoPatron } from "./servicios/crearTipoPatron";

export async function POST(request: Request) {
    try {
      const body = await request.json();
      validarCrearTipoPatron(body)
      const tipoPatron = await crearTipoPatron(body)
      return NextResponse.json({msg:'Tipo patron creado creado',tipoPatron})
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
  