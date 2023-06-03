import { NextResponse } from 'next/server';
import { errorHandler } from '../../common/errors/error.handler';
import { crearResponsable } from '../aplicacion/crearResponsable';
import { responsableRespositoryImpl } from '../infraestructura/responsableRespositorioImp';
import { string , object } from 'zod'
export async function POST(request: Request) {
    try {
    const body = await request.json();
    console.log(body);
      object({
        nombre: string({ description: "nombre es requerido" }),
        alias: string({description:"alias es requerido"})
      }).parse(body);
    //   const repositorio = responsableRespositoryImpl();
    //   const equipo = await crearResponsable(repositorio);
     return NextResponse.json({hola:'mundo'});
    } catch (error: any) {
        return errorHandler(error)
    }
  }