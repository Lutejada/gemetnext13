import { NextResponse } from "next/server";
import { auth } from "@/lib/getSession";
import { errorHandler } from "../../common/errors/error.handler";
import { CrearEjecucionPatrones } from "../application/use-cases/writer/crearEjecucionEquipos";
import { EjecucionPatronWriteRepositoryImp } from "../infrastructure/writer/ejecucionEquipoWriteRepositoryImp";
import { ResponsableReaderRepoImp } from "../../responsables/infrastructure/reader/responsableReaderRepoImp";
import { validarCrearEjecucionPatron } from "../application/dto/crearEjecucionPatron";
import { ListarEjecucionPatrones } from "../application/use-cases/reader/listarEjecucionPatrones";
import { EjecucionPatronesReadRepositoryImp } from "../infrastructure/reader/ejecucionEquiposReadRepositoryImp";
import { ProgramacionPatronesRepositoryReadImp } from "../../programacion-patrones/infraestructure/read/programacionPatronesRepoImp";
import { ProgramacionPatronesWriteRepoImp } from "../../programacion-patrones/infraestructure/write/programacionPatronesWriteRepoImp";

const ejecucionRepo = new EjecucionPatronWriteRepositoryImp();
const repoResponsable = new ResponsableReaderRepoImp();
const programacionRepoRead = new ProgramacionPatronesRepositoryReadImp();
const programacionRepoWrite = new ProgramacionPatronesWriteRepoImp();
const crearEjecucionEquipos = new CrearEjecucionPatrones(
  ejecucionRepo,
  programacionRepoRead,
  programacionRepoWrite,
  repoResponsable
);
const ejecucionRepoRead = new EjecucionPatronesReadRepositoryImp();
const listarEjecucionEquipos = new ListarEjecucionPatrones(ejecucionRepoRead);
export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearEjecucionPatron(body);
    const session = await auth();

    await crearEjecucionEquipos.execute(session.user.cliente_id, body);
    return NextResponse.json({ msg: "ejecucion creada" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();

    const listado = await listarEjecucionEquipos.execute(
      session.user.cliente_id
    );
    return NextResponse.json(listado);
  } catch (error: any) {
    return errorHandler(error);
  }
}
