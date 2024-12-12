import { ListarProveedoresDTO } from "../../dto/listarProveedore.DTO";
import { ProveedorService } from "../../../dominio/service/index";

interface ListarProvedoresUseCase {
  execute(clienteId: string): Promise<ListarProveedoresDTO[]>;
}

export class ListarProvedoresUseCaseImp implements ListarProvedoresUseCase {
  constructor(private proveedorService: ProveedorService) {}
  async execute(clienteId: string): Promise<ListarProveedoresDTO[]> {
    const proveedores = await this.proveedorService.obtenerListadoProveedores(
      clienteId
    );

    return proveedores.map((p) => ListarProveedoresDTO.entityToDto(p));
  }
}
