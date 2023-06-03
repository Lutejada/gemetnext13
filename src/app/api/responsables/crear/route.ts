import { NextResponse } from "next/server";
import { errorHandler } from "../../common/errors/error.handler";
import { crearResponsable } from "./servicios/crearResponsable";
import { validarCrearResponsable } from "./dtos/crearResponsable.dto";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearResponsable(body);
    await crearResponsable(body);
    return NextResponse.json({msg:'equipo creado'})
  } catch (error: any) {
    return errorHandler(error);
  }
}
// import { NextResponse } from 'next/server';
// import { errorHandler } from '../../common/errors/error.handler';
// import { crearResponsable } from '../aplicacion/crearResponsable';
// import { responsableRespositoryImpl } from '../infraestructura/responsableRespositorioImp';
// import { string , object } from 'zod'
// export async function POST(request: Request) {
//     try {
//     const body = await request.json();
//     console.log(body);
//       object({
//         nombre: string({ description: "nombre es requerido" }),
//         alias: string({description:"alias es requerido"})
//       }).parse(body);
//       const repositorio = responsableRespositoryImpl();
//       const responsable = await crearResponsable(repositorio,body);
//      return NextResponse.json(responsable);
//     } catch (error: any) {
//         return errorHandler(error)
//     }
//   }
