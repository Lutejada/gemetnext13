import { NextResponse } from "next/server";
import { errorHandler } from "../common/errors/error.handler";
import { validarCrearMarca } from "./dtos/crearMarca.dto";
import { crearMarca } from "./servicios/crearMarca";
import { obtenerTodosMarca } from "./servicios/obtenerTodoMarca";

export async function POST(request: Request) {
    try {
      const body = await request.json();
      validarCrearMarca(body)
      const marca = await crearMarca(body)
      return NextResponse.json({msg:'equipo creado',marca})
    } catch (error: any) {
      return errorHandler(error);
    }
  }
  
  
  export async function GET(_request: Request) {
    try {
      const todasMarcas = await obtenerTodosMarca()
      return NextResponse.json(todasMarcas)
    } catch (error: any) {
      return errorHandler(error);
    }
  }
  