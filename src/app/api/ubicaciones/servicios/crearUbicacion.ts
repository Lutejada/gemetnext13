import { responsableRepositorio } from "../../responsables/repositorio/responsableRepositorio";
import { crearUbicacionDto } from "../dtos/crearUbicacion.dto";
import { ResponsableNoExiste, ResponsableYaTieneUbicacion } from "../errors";
import { ubicacionRepositorio } from "../repostorio/ubicacionRepositorio";

export const crearUbicacion = async (ubicacionDto: crearUbicacionDto) => {
  const responsable = await responsableRepositorio.obtenerResponsableID(
    ubicacionDto.responsable_id
  );
  if (!responsable) {
    throw new ResponsableNoExiste();
  }
  const ubicacion = await ubicacionRepositorio.obtenerUbicacionPorResponsableId(
    ubicacionDto.responsable_id
  );

  if(ubicacion){
    throw new ResponsableYaTieneUbicacion()
  }
  return ubicacionRepositorio.crearUbicacion(ubicacionDto);
};
