import { ClienteNoExiste } from "../dominio/errors";
import { clienteRepositorio } from "../repositorio/clienteRepositorio";

export const obtenerClientePorId = async (id: string) => {
  const cliente = await clienteRepositorio.obtenerClientePorId(id);
  if(!cliente){
    throw new ClienteNoExiste()
  }
  return cliente
};
