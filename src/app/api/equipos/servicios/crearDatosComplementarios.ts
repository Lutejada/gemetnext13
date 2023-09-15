import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";
import { DatosComplementariosYaExisten, EquipoNoExiste } from "../errors";
import { equipoRepositorio } from "../repositorio/equipoRepositorio";
import { obtenerPorCodigo } from "./ObtenerPorCodigo";

export const crearDatosComplementarios = async (
  dto: CrearDatosComplementariosDto
) => {
  const equipoExiste = await obtenerPorCodigo(dto.codigo);
  if (!equipoExiste) {
    throw new EquipoNoExiste();
  }

  if(equipoExiste.datos_complementarios){
    throw new DatosComplementariosYaExisten()
  }

  return equipoRepositorio.crearDatosComplementarios(equipoExiste.id, dto);
};
