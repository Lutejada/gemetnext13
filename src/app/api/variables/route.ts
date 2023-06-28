import { NextResponse } from "next/server";
import { errorHandler } from "../common/errors/error.handler";
import { validarCrearVariable } from "./dtos/crear";
import { crearVariable } from "./servicios/crearVariable";

export async function POST(request: Request) {
    try {
      const body = await request.json();
      validarCrearVariable(body)
      const variable = await crearVariable(body)
      return NextResponse.json({msg:'variable creada',variable})
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
  