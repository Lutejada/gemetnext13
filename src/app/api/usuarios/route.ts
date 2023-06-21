import { NextResponse } from "next/server";
import { errorHandler } from "../common/errors/error.handler";
import { validarCrearUsuarioDto } from "./dtos/crearUsuario.dto";
import { crearUsuario } from "./servicios/crearUsuario";

export async function POST(request: Request) {
    try {
      const body = await request.json();
      validarCrearUsuarioDto(body)
      const usuario = await crearUsuario(body)
      return NextResponse.json({msg:'usuario creado',usuario})
    } catch (error: any) {
      return errorHandler(error);
    }
  }
  