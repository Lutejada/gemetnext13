import { NextResponse } from "next/server";
import { errorHandler } from "../common/errors/error.handler";
import { validarCrearFrecuencia } from "./dtos/crear";
import { crearFrecuencia } from "./servicios/crearFrecuencia";
import { obtenerfrecuencias } from "./servicios/obtenerFrecuencias";

export async function POST(request: Request) {
    try {
      const body = await request.json();
      validarCrearFrecuencia(body)
      const frecuencia= await crearFrecuencia(body)
      return NextResponse.json({msg:'frecuencia creada',frecuencia})
    } catch (error: any) {
      return errorHandler(error);
    }
  }
  
  
  export async function GET(_request: Request) {
    try {
      const frecuencias = await obtenerfrecuencias();
      NextResponse.json(frecuencias)
    } catch (error: any) {
      return errorHandler(error);
    }
  }
  