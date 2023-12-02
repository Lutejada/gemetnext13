import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { crearDatosMetrologicos } from "../../servicios/crearDatosMetrologicos";
import { validarCrearMetrologicos } from "../../dtos/crearDatosMetrologicos.dto";
import { validarEditarMetrologicos } from "../../dtos/editarDatosMetrologicos.dto";
import { editarDatosMetrologicos } from "../../servicios/editarDatosMetrologicos";


export async function POST(request: Request) {
    try {
      const body = await request.json();
      validarCrearMetrologicos(body)
      const datosMetrologicos = await crearDatosMetrologicos(body)
      return NextResponse.json({msg:'Datos guardados',datosMetrologicos})
    } catch (error: any) {
      return errorHandler(error);
    }
  }

export async function PUT(request: Request) {
    try {
      const body = await request.json();
      validarEditarMetrologicos(body)
      await editarDatosMetrologicos(body)
      return NextResponse.json({msg:'Datos editados'})
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
  