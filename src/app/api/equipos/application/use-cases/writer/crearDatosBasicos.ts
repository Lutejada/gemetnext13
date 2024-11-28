import { CrearEquipoDto } from "../../dtos/crearEquipo.dto";
import {
  EquipoReadRepository,
  EquipoWriteRepository,
} from "../../../dominio/repository/index";
import { EquipoExiste } from "../../../dominio/errors";
import { EquipoEntity } from "../../../dominio/entity";
import { MarcaReadRepository } from "../../../../marca/dominio/repository/index";
import { MarcaNoExiste } from "@/app/api/marca/dominio/errors";
import { UbicacionReadRepository } from "@/app/api/ubicaciones/dominio/repository";
import { UbicacionNoExiste } from "@/app/api/ubicaciones/dominio/errors";
interface CrearDatosBasicos {
  execute(clienteId: string, crearEquipoDto: CrearEquipoDto): Promise<void>;
}

export class CrearDatosBasicosUseCaseImp implements CrearDatosBasicos {
  constructor(
    private equipoWriteRepository: EquipoWriteRepository,
    private equipoReadRepository: EquipoReadRepository,
    private marcaReadRepository: MarcaReadRepository,
    private ubicacionReadRepository: UbicacionReadRepository
  ) {}
  async execute(
    clienteId: string,
    crearEquipoDto: CrearEquipoDto
  ): Promise<void> {
    const equipo = await this.equipoReadRepository.obtenerPorCodigo(
      crearEquipoDto.codigo,
      clienteId
    );

    const ubicacion = await this.ubicacionReadRepository.obtenerPorID(
      clienteId,
      crearEquipoDto.ubicacionId
    );
    const marca = await this.marcaReadRepository.obtenerPorID(
      clienteId,
      crearEquipoDto.marcaId
    );

    if (!marca) {
      throw new MarcaNoExiste();
    }
    if (!ubicacion) {
      throw new UbicacionNoExiste();
    }
    if (equipo) {
      throw new EquipoExiste();
    }
    const datosBasicos = new EquipoEntity({
      codigo: crearEquipoDto.codigo,
      descripcion: crearEquipoDto.descripcion,
      marca: marca,
      ubicacion: ubicacion,
      modelo: crearEquipoDto.modelo,
      serie: crearEquipoDto.serie,
    });
    await this.equipoWriteRepository.crearDatosBasicos(clienteId, datosBasicos);
  }
}
