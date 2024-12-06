import { CrearEquipoDto } from "../../dtos/crearEquipo.dto";
import { EquipoWriteRepository } from "../../../dominio/repository";
import { EquipoEntity } from "../../../dominio/entity";
import { MarcaReadRepository } from "../../../../marca/dominio/repository";
import { MarcaNoExiste } from "@/app/api/marca/dominio/errors";
import { UbicacionReadRepository } from "@/app/api/ubicaciones/dominio/repository";
import { UbicacionNoExiste } from "@/app/api/ubicaciones/dominio/errors";
import { EquipoService } from "../../../dominio/service";
import { IFilesAdaptor } from "@/app/api/common/files/saveFiles";
import { randomUUID } from "crypto";
import { Documentos } from "@/app/api/common/types";
interface CrearDatosBasicos {
  execute(clienteId: string, crearEquipoDto: CrearEquipoDto): Promise<void>;
}

export class CrearDatosBasicosUseCaseImp implements CrearDatosBasicos {
  constructor(
    private equipoWriteRepository: EquipoWriteRepository,
    private equipoService: EquipoService,
    private marcaReadRepository: MarcaReadRepository,
    private ubicacionReadRepository: UbicacionReadRepository,
    private saveFilesAdaptor: IFilesAdaptor
  ) {}
  async execute(
    clienteId: string,
    crearEquipoDto: CrearEquipoDto
  ): Promise<void> {
    const [_, marca, ubicacion] = await Promise.all([
      this.equipoService.obtenerEquipoPorCodigo(
        crearEquipoDto.codigo,
        clienteId
      ),
      this.marcaReadRepository.obtenerPorID(clienteId, crearEquipoDto.marcaId),
      this.ubicacionReadRepository.obtenerPorID(
        clienteId,
        crearEquipoDto.ubicacionId
      ),
    ]);

    if (!marca) {
      throw new MarcaNoExiste();
    }
    if (!ubicacion) {
      throw new UbicacionNoExiste();
    }

    const equipoID = this.generarEquipoId();

    const documentos = await this.guardarArchivos(
      clienteId,
      equipoID,
      crearEquipoDto.archivos
    );

    const datosBasicos = new EquipoEntity({
      id: equipoID,
      codigo: crearEquipoDto.codigo,
      descripcion: crearEquipoDto.descripcion,
      marca: marca,
      ubicacion: ubicacion,
      modelo: crearEquipoDto.modelo,
      serie: crearEquipoDto.serie,
      documentos: documentos,
    });
    await this.equipoWriteRepository.crearDatosBasicos(clienteId, datosBasicos);
  }

  private generarEquipoId() {
    return randomUUID().toString();
  }

  private async guardarArchivos(
    clienteId: string,
    equipoId: string,
    archivos?: File[]
  ): Promise<Documentos[]> {
    if (!archivos) return [];
    const pathName = `equipos/${clienteId}/${equipoId}`;
    return this.saveFilesAdaptor.saveFiles(pathName, archivos);
  }
}
