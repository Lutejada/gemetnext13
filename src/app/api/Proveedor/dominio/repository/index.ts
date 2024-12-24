import { Proveedor } from "../entity";

export interface ProveedorReadRepository {
  listarProveedores(clienteId: string): Promise<Proveedor[]>;
  obtenerPorID(id: string, clienteId: string): Promise<Proveedor | null>;
  obtenerPorIdentificacion(
    id: string,
    clienteId: string
  ): Promise<Proveedor | null>;
  obtenerListadoProveedores(clienteId: string): Promise<Proveedor[]>;
}
export interface ProveedorWriteRepository {
  crear(proveedor: Proveedor): Promise<void>;
  editar(proveedor: Proveedor): Promise<void>;
}
