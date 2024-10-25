import { NextResponse } from "next/server";
import { auth } from "@/lib/getSession";
import { errorHandler } from "../../common/errors/error.handler";
import { CrearEjecucionEquipos } from "../application/use-cases/writer/crearEjecucionEquipos";
import { EjecucionEquipoWriteRepositoryImp } from "../infrastructure/writer/ejecucionEquipoWriteRepositoryImp";
import { ResponsableReaderRepoImp } from "../../responsables/infrastructure/reader/responsableReaderRepoImp";
import {
  validarCrearEjecucionEquipo,
  CrearEjecucionDTO,
} from "../application/dto/crearEjecucionEquipo";
import { EquipoReadRepositoryImp } from "../../equipos/infrastructure/reader/equipoReadRepository";
import { EquipoWriteRepositoryImp } from "../../equipos/infrastructure/writer/equipoWriteRepository";
import { ListarEjecucionEquipos } from "../application/use-cases/reader/listarEjecucionEquipos";
import { EjecucionEquiposReadRepositoryImp } from "../infrastructure/reader/ejecucionEquiposReadRepositoryImp";
import { SaveFilesVercel } from "../../common/files/saveFiles";

const ejecucionRepo = new EjecucionEquipoWriteRepositoryImp();
const repoResponsable = new ResponsableReaderRepoImp();
const equipoRepo = new EquipoReadRepositoryImp();
const equipoRepoWrite = new EquipoWriteRepositoryImp();
const fileService = new SaveFilesVercel();
const crearEjecucionEquipos = new CrearEjecucionEquipos(
  ejecucionRepo,
  equipoRepo,
  equipoRepoWrite,
  repoResponsable,
  fileService
);
const ejecucionRepoRead = new EjecucionEquiposReadRepositoryImp();
const listarEjecucionEquipos = new ListarEjecucionEquipos(ejecucionRepoRead);
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const body: CrearEjecucionDTO = {
      fechaEjecucion: formData.get("fechaEjecucion") as string,
      observaciones: formData.get("observaciones") as string,
      ejecutorId: formData.get("ejecutorId") as string,
      programacionEquipoId: formData.get("programacionEquipoId") as string,
      archivos: formData.getAll("archivos") as File[],
    };

    validarCrearEjecucionEquipo(body);
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
