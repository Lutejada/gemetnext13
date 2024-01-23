import { CrearResponsableDto } from "../dtos/crearResponsable.dto";
import { ResponsableYaExiste } from "../errors";
import { responsableRepositorio } from "../repositorio/responsableRepositorio";

export const crearResponsable = async (
  responsable: CrearResponsableDto,
  clienteId: string
) => {
  const responsableIdent = await responsableRepositorio.obtenerResponsableIdent(
    responsable.identificacion,
    clienteId
  );
  if (responsableIdent) {
    throw new ResponsableYaExiste();
  }
  await responsableRepositorio.crearResponsable(responsable, clienteId);
};
