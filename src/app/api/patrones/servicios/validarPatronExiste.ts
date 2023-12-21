import { PatronNoExiste } from "../errors";
import { obtenerPorCodigo } from "./ObtenerPorCodigo";
export const validarPatronExiste = async (codigo: string) => {
  const patronExiste = await obtenerPorCodigo(codigo);
  if (!patronExiste) {
    throw new PatronNoExiste();
  }
  return patronExiste;
};
