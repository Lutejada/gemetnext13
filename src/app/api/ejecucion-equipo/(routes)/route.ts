import { NextResponse } from "next/server";
import { auth } from "@/lib/getSession";
import { errorHandler } from "../../common/errors/error.handler";
import { CrearEjecucionEquipos } from "../application/use-cases/writer/crearEjecucionEquipos";
import { EjecucionEquipoWriteRepositoryImp } from "../infrastructure/writer/ejecucionEquipoWriteRepositoryImp";
import { ResponsableReaderRepoImp } from "../../responsables/infrastructure/reader/responsableReaderRepoImp";
import { validarCrearEjecucionEquipo } from "../application/dto/crearEjecucionEquipo";

const repo = new EjecucionEquipoWriteRepositoryImp();
const repoResponsable = new ResponsableReaderRepoImp();
const crearEjecucionEquipos = new CrearEjecucionEquipos(repo, repoResponsable);
export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearEjecucionEquipo(body);
    const session = await auth();

    await crearEjecucionEquipos.execute(session.user.cliente_id, body);
    return NextResponse.json({ msg: "ejecucion creada" });
  } catch (error: any) {
    return errorHandler(error);
  }
}
