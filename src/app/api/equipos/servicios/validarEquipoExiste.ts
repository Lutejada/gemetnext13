import { EquipoNoExiste } from "../errors/index";
import { obtenerPorCodigo } from "./ObtenerPorCodigo";
export const validarEquipoExiste = async (codigo: string) => {
  const equipoExiste = await obtenerPorCodigo(codigo);
  if (!equipoExiste) {
    throw new EquipoNoExiste();
  }
  return equipoExiste
};
