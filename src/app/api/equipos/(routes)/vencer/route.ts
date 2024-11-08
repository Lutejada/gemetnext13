import { errorHandler } from "@/app/api/common/errors/error.handler";
import { auth } from "@/lib/getSession";
import { NextResponse } from "next/server";
import { ListarProgramacionEquipos } from "@/app/api/programacion-equipos/application/use-cases/listarProgramacionEquipos";
import { ProgramacionEquiposRepositoryReadImp } from "@/app/api/programacion-equipos/infraestructure/read/programacionEquipoRepoImp";

const programacionRepoRead = new ProgramacionEquiposRepositoryReadImp();
const useCase = new ListarProgramacionEquipos(programacionRepoRead);
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    //poner paginacion
    const session = await auth();
    const response = await useCase.execute(session.user.cliente_id);
    return NextResponse.json(response);
  } catch (error: any) {
    return errorHandler(error);
  }
}
