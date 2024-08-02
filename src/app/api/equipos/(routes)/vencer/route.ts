import { errorHandler } from "@/app/api/common/errors/error.handler";
import { auth } from "@/lib/getSession";
import { listarEquiposProgramadosVencer } from "../../application/servicios/listarEquiposProgramadosVencer";
import { NextResponse } from "next/server";
import { ListarEquiposProgramadosVencer } from "../../application/use-cases/reader/listarEquiposProgramadosVencer";
import { EquipoReadRepositoryImp } from "../../infrastructure/reader/equipoReadRepository";

const repo = new EquipoReadRepositoryImp();
const useCase = new ListarEquiposProgramadosVencer(repo);
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
