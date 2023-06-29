import { NextResponse } from "next/server";
import { errorHandler } from "../common/errors/error.handler";

export async function POST(request: Request) {
    try {
      const body = await request.json();
      return NextResponse.json({msg:'equipo creado'})
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
  