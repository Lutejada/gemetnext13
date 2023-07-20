import { responsableRepositorio } from "../../responsables/repositorio/responsableRepositorio";
import { crearUbicacionDto } from "../dtos/crearUbicacion.dto";
import { ResponsableNoExiste, ResponsableYaTieneUbicacion, UbicacionExiste } from "../errors";
import { ubicacionRepositorio } from "../repostorio/ubicacionRepositorio";

export const crearUbicacion = async (ubicacionDto: crearUbicacionDto) => {
  ubicacionDto.nombre = ubicacionDto.nombre.toLowerCase()
  const responsable = await responsableRepositorio.obtenerResponsableID(
    ubicacionDto.responsable_id
  );
  if (!responsable) {
    throw new ResponsableNoExiste();
  }
  const ubicacionExiste = await ubicacionRepositorio.obtenerPorNombre(ubicacionDto.nombre)
  if(ubicacionExiste){
    throw new UbicacionExiste()
  }
    
  return ubicacionRepositorio.crearUbicacion(ubicacionDto);
};
