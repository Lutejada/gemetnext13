import { responsableRepositorio } from "../../responsables/repositorio/responsableRepositorio";
import { crearUbicacionDto } from "../dtos/crearUbicacion.dto";
import { ResponsableNoExiste, UbicacionExiste } from "../dominio/errors";
import { ubicacionRepositorio } from "../repostorio/ubicacionRepositorio";

export const crearUbicacion = async (
  ubicacionDto: crearUbicacionDto,
  clienteId: string
) => {
  ubicacionDto.nombre = ubicacionDto.nombre.toLowerCase();
  const responsable = await responsableRepositorio.obtenerResponsableID(
    ubicacionDto.responsable_id,
    clienteId
  );
  if (!responsable) {
    throw new ResponsableNoExiste();
  }
  const ubicacionExiste = await ubicacionRepositorio.obtenerPorNombre(
    ubicacionDto.nombre,
    clienteId
  );
  if (ubicacionExiste) {
    throw new UbicacionExiste();
  }

  return ubicacionRepositorio.crearUbicacion(ubicacionDto, clienteId);
};
