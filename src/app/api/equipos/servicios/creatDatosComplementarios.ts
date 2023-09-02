import { EquipoNoExiste } from "../errors";
import { obtenerPorCodigo } from "./ObtenerPorCodigo";

export const crearDatosComplementarios = async () => {
  const equipoExiste = await obtenerPorCodigo(dto.codigo);
  if (!equipoExiste) {
    throw new EquipoNoExiste();
  }

  
};
