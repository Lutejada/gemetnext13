import { ResponseListadoPaginado } from "@/app/api/common/dto/listadoPaginado";
import { SearchValuesDTO } from "@/app/api/common/types";
import { PatronInformacionBasicaDTO } from "../../dto/obtenerPatrones";
import { PatronReadRepository } from "../../../dominio/repository";
import { TerminoDeBusquedaNoExiste } from "@/app/api/common/errors/search";
import { calcularPagina, paginaSiguienteExiste } from "@/lib/pagination";

interface ListarPatronTerminoUseCase {
  execute(
    clienteId: string,
    queryOpstions: SearchValuesDTO
  ): Promise<ResponseListadoPaginado<PatronInformacionBasicaDTO>>;
}

const terminosDeBusquedaPermitidos = ["codigo", "descripcion"];
export class ListarPatronTerminoUseCaseImp
  implements ListarPatronTerminoUseCase
{
  constructor(private patronReadRepository: PatronReadRepository) {}
  async execute(
    clienteId: string,
    searchValuesDTO: SearchValuesDTO
  ): Promise<ResponseListadoPaginado<PatronInformacionBasicaDTO>> {
    const { limit, page, termino, valor } = searchValuesDTO;
    if (!terminosDeBusquedaPermitidos.includes(termino.trim())) {
      throw new TerminoDeBusquedaNoExiste();
    }
    const { porPagina, skip } = calcularPagina(page, limit);

    const total = await this.patronReadRepository.totalPatronesPorTermino(
      clienteId,
      termino,
      valor
    );
    const existePaginaSiguiente = paginaSiguienteExiste(page, total, limit);
    const patrones = await this.patronReadRepository.obtenerPatronesPorTermino(
      clienteId,
      termino,
      valor,
      {
        limit: porPagina,
        page: skip,
      }
    );

    const data = PatronInformacionBasicaDTO.converToDTO(patrones);

    return {
      data,
      existePaginaSiguiente,
      pagina: page,
      total,
    };
  }
}
