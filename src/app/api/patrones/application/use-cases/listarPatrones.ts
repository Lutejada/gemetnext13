import { ResponseListadoPaginado } from "@/app/api/common/dto/listadoPaginado";
import { queryValuesDTO } from "@/app/api/common/types";
import { PatronInformacionBasicaDTO } from "../dto/obtenerPatrones";
import { PatronEntity } from "../../dominio/entity/intex";
import { PatronRepositoryRead } from "../../dominio/repository/index";
import { calcularPagina, paginaSiguienteExiste } from "@/lib/pagination";

interface ListarPatronesUseCase {
  execute(
    clienteId: string,
    queryOpstions: queryValuesDTO
  ): Promise<ResponseListadoPaginado<PatronInformacionBasicaDTO>>;
}

export class ListarPatronesUseCaseImp implements ListarPatronesUseCase {
  constructor(private patronRepositoryRead: PatronRepositoryRead) {}
  async execute(
    clienteId: string,
    queryOpstions: queryValuesDTO
  ): Promise<ResponseListadoPaginado<PatronInformacionBasicaDTO>> {
    const { limit = 5, page, termino, valor } = queryOpstions;
    const { porPagina, skip } = calcularPagina(page, limit);

    const total = await this.patronRepositoryRead.totalPatrones(clienteId);
    const existePaginaSiguiente = paginaSiguienteExiste(page, total, limit);

    const equipos = await this.patronRepositoryRead.listarPatrones(
      clienteId,
      skip,
      porPagina
    );

    const data = this.converToDTO(equipos);

    return {
      data,
      existePaginaSiguiente,
      pagina: page,
      total,
    };
  }

  converToDTO(equipos: PatronEntity[]): PatronInformacionBasicaDTO[] {
    return equipos.map((e) => ({
      id: e.id,
      codigo: e.codigo,
      descripcion: e.descripcion,
      marca: e.marca.descripcion,
      responsable:
        e.ubicacion.responsable.nombre + " " + e.ubicacion.responsable.apellido,
    }));
  }
}
