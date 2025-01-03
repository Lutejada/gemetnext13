import { NextResponse } from "next/server";
import { errorHandler } from "../common/errors/error.handler";
import { validarCrearTipoPatron } from "./dtos/crear";
import { crearTipoPatron } from "./servicios/crearTipoPatron";
import { auth } from "@/lib/getSession";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearTipoPatron(body);
    const session = await auth();
    const tipoPatron = await crearTipoPatron(body, session.user.clienteId);
    return NextResponse.json({ msg: "Tipo patron creado creado", tipoPatron });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(_request: Request) {
  try {
    const session = await auth();
    const patrones = await prisma.tipo_patron.findMany({
      where: { cliente_id: session.user.clienteId },
    });
    return NextResponse.json(patrones);
  } catch (error: any) {
    return errorHandler(error);
  }
}
