import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { validarCrearComplementarios } from "../../dtos/crearDatosComplementarios.dto";
import { crearDatosComplementarios } from '../../servicios/crearDatosComplementarios';
import { validarEditarComplementarios } from "../../dtos/editarDatosComplementarios.dto";
import { editarDatosComplementarios } from "../../servicios/editarDatosComplementarios";


export async function POST(request: Request) {
    try {
      const body = await request.json();
      validarCrearComplementarios(body)
      const complementarios = await crearDatosComplementarios(body)
      return NextResponse.json({msg:'Datos guardados',complementarios})
    } catch (error: any) {
      return errorHandler(error);
    }
  }
  
export async function PUT(request: Request) {
    try {
      const body = await request.json();
      validarEditarComplementarios(body)
      const complementarios = await editarDatosComplementarios(body)
      return NextResponse.json({msg:'Datos editados',complementarios})
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
  