import { equipoRepositorio } from "../repositorio/equipoRepositorio";

export const obtenerEquipos = async (
  termino?: string | null,
  valor?: string | null,
  page?: number
) => {
  if (termino && valor) {
    const equipoTermino = await equipoRepositorio.obtenerEquiposPorCodigo(
      valor
    );
    return equipoTermino;
  }
  return equipoRepositorio.obtenerEquipos(page);
};
