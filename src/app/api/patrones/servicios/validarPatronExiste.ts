import { PatronNoExiste } from "../errors";
import { obtenerPorCodigo } from "./ObtenerPorCodigo";
export const validarPatronExiste = async (
  codigo: string,
  clienteId: string
) => {
  const patronExiste = await obtenerPorCodigo(codigo, clienteId);
  if (!patronExiste) {
    throw new PatronNoExiste();
  }
  return patronExiste;
};
