import { ClienteNoExiste } from "../dominio/errors";
import { clienteRepositorio } from "../repositorio/clienteRepositorio";

export const obtenerClientePorNombre = async (nombre: string) => {
  const cliente = await clienteRepositorio.obtenerClientePorNombre(nombre);
  if(!cliente){
    throw new ClienteNoExiste()
  }
  return cliente
};
