import { ResponseListadoPaginado } from "@/app/api/common/dto/listadoPaginado";
import { queryValuesDTO, SearchValuesDTO } from "@/app/api/common/types";
import { EquipoInformacionBasicaDTO } from "../../dtos/obtenerEquipos.dto.output";
import { EquipoReadRepository } from "../../../dominio/repository/index";
import { calcularPagina, paginaSiguienteExiste } from "@/lib/pagination";
import { TerminoDeBusquedaNoExiste } from "@/app/api/common/errors/search";

interface ListarEquipoTerminoUseCase {
  execute(
    clienteId: string,
    queryOpstions: SearchValuesDTO
  ): Promise<ResponseListadoPaginado<EquipoInformacionBasicaDTO>>;
}

const terminosDeBusquedaPermitidos = ["codigo", "descripcion"];
export class ListarEquipoTerminoUseCaseImp
  implements ListarEquipoTerminoUseCase
{
  constructor(private equipoReadRepository: EquipoReadRepository) {}
  async execute(
    clienteId: string,
    searchValuesDTO: SearchValuesDTO
  ): Promise<ResponseListadoPaginado<EquipoInformacionBasicaDTO>> {
    const { limit, page, termino, valor } = searchValuesDTO;
    if (!terminosDeBusquedaPermitidos.includes(termino.trim())) {
      throw new TerminoDeBusquedaNoExiste();
    }
    const { porPagina, skip } = calcularPagina(page, limit);

    const total = await this.equipoReadRepository.totalEquiposPorTermino(
      clienteId,
      termino,
      valor
    );
    const existePaginaSiguiente = paginaSiguienteExiste(page, total, limit);
    const equipos = await this.equipoReadRepository.obtenerEquiposPorTermino(
      clienteId,
      termino,
      valor,
      {
        limit: porPagina,
        page: skip,
      }
    );

    const data = EquipoInformacionBasicaDTO.converToDTO(equipos);

    return {
      data,
      existePaginaSiguiente,
      pagina: page,
      total,
    };
  }
}
