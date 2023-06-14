import { crearResponsableDto } from "../dtos/crearResponsable.dto";
import { ResponsableYaExiste } from "../errors";
import { responsableRepositorio } from "../repositorio/responsableRepositorio";

export const crearResponsable = async (responsable: crearResponsableDto) => {
  const responsableIdent = await responsableRepositorio.obtenerResponsableIdent(
    responsable.identificacion
  );
  if (responsableIdent) {
    throw new ResponsableYaExiste();
  }
  await responsableRepositorio.crearResponsable(responsable);
};
