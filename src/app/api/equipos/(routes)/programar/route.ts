import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { ObtenerDatosDto } from "@/app/api/common/types";
import { auth } from "@/lib/getSession";
import { validarCrearProgramacion } from "../../application/dtos/crearProgramation.dto";
import { EquipoReadRepositoryImp } from "../../infrastructure/reader/equipoReadRepository";
import { ListarProgramacionEquipos } from "@/app/api/programacion-equipos/application/use-cases/listarProgramacionEquipos";
import { ProgramacionEquiposRepositoryReadImp } from "@/app/api/programacion-equipos/infraestructure/read/programacionEquipoRepoImp";
import { CrearProgramacionEquipos } from "@/app/api/programacion-equipos/application/use-cases/crearProgramacionEquipos";
import { ProgramacionEquiposWriteRepoImp } from "@/app/api/programacion-equipos/infraestructure/write/programacionEquipoWriteRepoImp";
import { ActividadRepoReadImp } from "@/app/api/actividad/infraestructure/read/actividadRepoRead";
import { FrecuenciaRepositoryReadImp } from "@/app/api/frecuencia/infraestructure/repository/read/frecuenciaRepoImp";
const equipoRepoRead = new EquipoReadRepositoryImp();
const programacionRepoRead = new ProgramacionEquiposRepositoryReadImp();
const listarEquiposProgramados = new ListarProgramacionEquipos(
  programacionRepoRead
);
const actividadRepo = new ActividadRepoReadImp();
const frecuenciaRepo = new FrecuenciaRepositoryReadImp();
const programacionRepoWrite = new ProgramacionEquiposWriteRepoImp();
const crearProgramacionEquiposUseCase = new CrearProgramacionEquipos(
  programacionRepoWrite,
  actividadRepo,
  equipoRepoRead,
  frecuenciaRepo,
  programacionRepoRead
);
export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearProgramacion(body);
    const session = await auth();
    await crearProgramacionEquiposUseCase.execute(
      session.user.cliente_id,
      body
    );
    return NextResponse.json({ msg: "equipo programado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 5);
    const session = await auth();
    const programacion = await listarEquiposProgramados.execute(
      session.user.cliente_id,
      page,
      limit
    );
    return NextResponse.json(programacion);
  } catch (error: any) {
    return errorHandler(error);
  }
}
