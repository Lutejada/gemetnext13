import { NextResponse } from "next/server";
import { errorHandler } from "../../../common/errors/error.handler";
import { ObtenerDatosDto } from "@/app/api/common/types";
import { listarPatronesProgramados } from "../../servicios/listarPatronesProgramados";
import { auth } from "@/lib/getSession";
import { ProgramacionPatronesWriteRepoImp } from "@/app/api/programacion-patrones/infraestructure/write/programacionPatronesWriteRepoImp";
import { ActividadRepoReadImp } from "@/app/api/actividad/infraestructure/read/actividadRepoRead";
import { PatronRepositoryReadImp } from "../../infraestructure/repository/read";
import { FrecuenciaRepositoryReadImp } from "@/app/api/frecuencia/infraestructure/repository/read/frecuenciaRepoImp";
import { CrearProgramacionPatrones } from "@/app/api/programacion-patrones/application/use-cases/crearProgramacionPatrones";
import { validarCrearProgramacion } from "@/app/api/programacion-patrones/application/dto/crearProgramation.dto";
import { ProgramacionPatronesRepositoryReadImp } from "@/app/api/programacion-patrones/infraestructure/read/programacionPatronesRepoImp";

const programacionPatronesRepo = new ProgramacionPatronesWriteRepoImp();
const actividadRepo = new ActividadRepoReadImp();
const patronRepo = new PatronRepositoryReadImp();
const frecuenciaRepo = new FrecuenciaRepositoryReadImp();
const programacionRepoRead = new ProgramacionPatronesRepositoryReadImp();
const crearProgramacionUseCase = new CrearProgramacionPatrones(
  programacionPatronesRepo,
  actividadRepo,
  patronRepo,
  frecuenciaRepo,
  programacionRepoRead
);
export async function POST(request: Request) {
  try {
    const body = await request.json();
    validarCrearProgramacion(body);
    const session = await auth();
    await crearProgramacionUseCase.execute(session.user.cliente_id, body);
    return NextResponse.json({ msg: "patron creado creado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const dto: ObtenerDatosDto = {
      page: Number(page) || 1,
    };
    const session = await auth();
    const programacion = await listarPatronesProgramados(
      dto,
      session.user.cliente_id
    );
    return NextResponse.json(programacion);
  } catch (error: any) {
    return errorHandler(error);
  }
}
