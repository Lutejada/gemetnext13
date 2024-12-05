import { NextResponse } from "next/server";
import { crearPatron } from "../servicios/crearPatron";
import { errorHandler } from "../../common/errors/error.handler";
import {
  CrearPatronDto,
  validarCrearPatron,
} from "../application/dto/crearPatrones";
import { validarEditarBasicos } from "../dtos/editarBasicos.dto";
import { editarDatosBasicos } from "../servicios/editarDatosBasicos";
import { auth } from "@/lib/getSession";
import { ListarPatronesUseCaseImp } from "../application/use-cases/listarPatrones";
import { PatronRepositoryReadImp } from "../infraestructure/repository/read/index";
import { MarcaReadRepositoryImp } from "../../marca/infrastructure/reader/marcaReadRepositoryImp";
import { UbicacionRepositoryReadImp } from "../../ubicaciones/infrastructure/read/ubicacionRepositoryReadImp";
import { CrearDatosBasicosUseCaseImp } from "../application/use-cases/write/crearDatosBasicos";
import { PatronWriteRepositoryImp } from "../infraestructure/repository/write/PatronRepositoryWriteImpl";

import { SaveFilesVercel } from "../../common/files/saveFiles";
import { PatronService } from "../dominio/service";
import { formDataToDto } from "@/lib/helpers/formData";

const marcaReadRepository = new MarcaReadRepositoryImp();
const ubicacionReadRepository = new UbicacionRepositoryReadImp();
const patronReadRepository = new PatronRepositoryReadImp();
const patronWriteRepositoryImp = new PatronWriteRepositoryImp();
const patronService = new PatronService(patronReadRepository);
const listarPatronsUseCase = new ListarPatronesUseCaseImp(patronReadRepository);
const fileService = new SaveFilesVercel();
const crearDatosBasicosUseCaseImp = new CrearDatosBasicosUseCaseImp(
  patronWriteRepositoryImp,
  patronService,
  marcaReadRepository,
  ubicacionReadRepository,
  fileService
);
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const dto = formDataToDto<CrearPatronDto>(formData);
    const dtoTransform = validarCrearPatron(dto);
    const session = await auth();
    await crearDatosBasicosUseCaseImp.execute(session.user.cliente_id, dtoTransform);
    return NextResponse.json({ msg: "patron creado creado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    validarEditarBasicos(body);
    const session = await auth();
    await editarDatosBasicos(body, session.user.cliente_id);
    return NextResponse.json({ msg: "patron editado" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const termino = searchParams.get("termino");
    const valor = searchParams.get("valor");
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 5);
    const session = await auth();
    const patrones = await listarPatronsUseCase.execute(
      session.user.cliente_id,
      {
        limit,
        page,
        valor,
        termino,
      }
    );
    return NextResponse.json(patrones);
  } catch (error: any) {
    return errorHandler(error);
  }
}
