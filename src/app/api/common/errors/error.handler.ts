import { NextResponse } from "next/server";
import { ZodError } from "zod";
export const errorHandler = (error: any) => {
  console.error("entro al error handler", error);
  if (error.cause === "negocio") {
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }

  if (error.cause === "Unauthorized") {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  if (error instanceof ZodError) {
    error as ZodError;
    const errorMesage = error.errors
      .map((error) => `${error.path[0]} - ${error.message}`)
      .toString();

    return NextResponse.json(
      { error: errorMesage, typeError: "validation" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { error: "Un error inesperado a ocurrido contactese con su admin" },
    { status: 500 }
  );
};
