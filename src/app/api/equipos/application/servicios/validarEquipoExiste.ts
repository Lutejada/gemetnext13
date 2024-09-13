import { EquipoNoExiste } from "../../dominio/errors/index";
import { obtenerPorCodigo } from "./ObtenerPorCodigo";
export const validarEquipoExiste = async (
  codigo: string,
  clienteId: string
) => {
  const equipoExiste = await obtenerPorCodigo(codigo, clienteId);
  if (!equipoExiste) {
    throw new EquipoNoExiste();
  }
  return equipoExiste;
};
