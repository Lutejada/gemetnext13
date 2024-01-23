import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos";
import { DatosMetrologicosYaExisten, PatronNoExiste } from "../errors";
import { patronRepositorio } from "../repositorio/patronRepositorio";

export const crearDatosMetrologicos = async (
  dto: CrearDatosMetrologicosDto,
  clienteId: string
) => {
  const patronExiste = await patronRepositorio.obtenerPatronPorCodigo(
    dto.codigo,
    clienteId
  );
  if (!patronExiste) {
    throw new PatronNoExiste();
  }

  if (patronExiste.datos_metrologicos) {
    throw new DatosMetrologicosYaExisten();
  }

  return patronRepositorio.crearDatosMetrologicos(
    dto,
    patronExiste.id,
    clienteId
  );
};
