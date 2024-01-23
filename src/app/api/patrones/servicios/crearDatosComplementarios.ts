import { CrearDatosComplementariosDto } from "../dtos/crearDatosComplementarios.dto";
import { DatosComplementariosYaExisten, PatronYaExiste } from "../errors";
import { patronRepositorio } from "../repositorio/patronRepositorio";
import { obtenerPorCodigo } from "./ObtenerPorCodigo";

export const crearDatosComplementarios = async (
  dto: CrearDatosComplementariosDto,
  clienteId: string
) => {
  const patronExiste = await obtenerPorCodigo(dto.codigo, clienteId);
  if (!patronExiste) {
    throw new PatronYaExiste();
  }

  if (patronExiste.datos_complementarios) {
    throw new DatosComplementariosYaExisten();
  }

  return patronRepositorio.crearDatosComplementarios(
    patronExiste.id,
    dto,
    clienteId
  );
};
