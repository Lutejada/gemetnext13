import { ClienteNoExiste } from "../errors";
import { ClienteReadRepository } from "../repository";

export class ClienteService {
  constructor(private clienteReadRepository: ClienteReadRepository) {}

  async obtenerClientePorNombre(nombre: string) {
    return this.clienteReadRepository.obtenerPorNombre(nombre);
  }

  async validarClienteExiste(nombre: string) {
    const cliente = await this.obtenerClientePorNombre(nombre);
    if (!cliente) {
      throw new ClienteNoExiste();
    }

    return cliente;
  }
}
