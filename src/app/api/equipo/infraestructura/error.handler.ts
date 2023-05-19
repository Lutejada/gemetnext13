import { NextResponse } from "next/server";
import { ZodError } from "zod";
export const errorHandler = (error: any) => {
  if (error.cause === "negocio") {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (error instanceof ZodError) {
    error as ZodError;
    const errorMesage = error.errors.map((error) => error.message).toString();
    return NextResponse.json({ error: errorMesage }, { status: 400 });
  }
  return NextResponse.json({ error: error.message }, { status: 500 });
};
