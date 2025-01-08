import { Proveedor } from "../entity/index";
import { ProveedorExiste, ProveedorNoExiste } from "../errors";
import {
  ProveedorWriteRepository,
  ProveedorReadRepository,
} from "../repository/index";
export class ProveedorService {
  constructor(
    private proveedorWriteRepository: ProveedorWriteRepository,
    private proveedorReadRepository: ProveedorReadRepository
  ) {}

  async obtenerPorId(id: string, clienteId: string) {
    return this.proveedorReadRepository.obtenerPorID(id, clienteId);
  }

  async obtenerListadoProveedores(clienteId: string) {
    return this.proveedorReadRepository.obtenerListadoProveedores(clienteId);
  }

  async obtenerPorIdentificacion(identificacion: string, clienteId: string) {
    return this.proveedorReadRepository.obtenerPorIdentificacion(
      identificacion,
      clienteId
    );
  }
  async crear(proveedor: Proveedor) {
    const proveedorEncontrado = await this.obtenerPorIdentificacion(
      proveedor.numeroIdentificacion,
      proveedor.cliente.id
    );

    if (proveedorEncontrado) {
      throw new ProveedorExiste();
    }

    await this.proveedorWriteRepository.crear(proveedor);
  }

  async editar(proveedor: Proveedor) {
    const proveedorEncontrado = await this.obtenerPorId(
      proveedor.id,
      proveedor.cliente.id
    );

    if (!proveedorEncontrado) {
      throw new ProveedorNoExiste();
    }
    await this.proveedorWriteRepository.editar(proveedor);
  }
}
