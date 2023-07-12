import { NextResponse } from 'next/server';
import { errorHandler } from '../common/errors/error.handler';
import { validarCrearUbicacion } from './dtos/crearUbicacion.dto';
import { ubicacionRepositorio } from './repostorio/ubicacionRepositorio';
import { crearUbicacion } from './servicios/crearUbicacion';
import { obtenerUbicaciones } from './servicios/obtenerUbicaciones';
export async function POST(request: Request) {
    try {
      const body = await request.json();
      validarCrearUbicacion(body);
      const ubicacion = await crearUbicacion(body)
      return NextResponse.json({msg:'Ubicacion creada',ubicacion})
    } catch (error: any) {
      return errorHandler(error);
    }
  }

export async function GET() {
  try {
    const ubicaciones = await obtenerUbicaciones()
    return NextResponse.json(ubicaciones)
  } catch (error) {
    return errorHandler(error);
  }
}